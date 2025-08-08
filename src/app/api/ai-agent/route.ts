import { NextResponse } from "next/server";
import { Type } from "@google/genai";
import {
  AIService,
  type AgentChatMessage,
  type ToolDeclaration,
  type ToolFunction,
} from "@/service/ai.service";

// Types for external APIs
type OpenMeteoGeocodeResponse = {
  results?: Array<{
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
  }>;
};

type OpenMeteoForecastResponse = {
  current_weather?: {
    temperature: number;
    windspeed: number;
    time: string;
  };
};

type WikipediaSearchResponse = {
  query?: {
    search?: Array<{
      title: string;
      pageid: number;
      snippet: string;
    }>;
  };
};

type CoinGeckoPriceResponse = Record<string, Record<string, number>>;

// Helpers
async function withTimeout<T>(p: Promise<T>, ms = 10000): Promise<T> {
  return await Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms)),
  ]);
}

// Tool implementations
async function get_weather({
  location,
  unit = "celsius",
}: {
  location: string;
  unit?: "celsius" | "fahrenheit";
}) {
  if (!location || typeof location !== "string") {
    return { error: "Location is required as a string." };
  }
  try {
    const geo: OpenMeteoGeocodeResponse = await withTimeout(
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location
        )}&count=1`
      ).then((r) => r.json())
    );
    const hit = geo.results?.[0];
    if (!hit) return { error: `Could not find coordinates for "${location}"` };

    const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";

    const wx: OpenMeteoForecastResponse = await withTimeout(
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${hit.latitude}&longitude=${hit.longitude}&current_weather=true&temperature_unit=${tempUnit}`
      ).then((r) => r.json())
    );

    const current = wx.current_weather;
    if (!current) return { error: "No current weather found." };

    return {
      location: `${hit.name}, ${hit?.country || ""}`.trim(),
      temperature: current.temperature,
      unit: tempUnit === "celsius" ? "°C" : "°F",
      windspeed: current.windspeed,
      windspeed_unit: tempUnit === "celsius" ? "km/h" : "mph",
      time: current.time,
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Weather tool failed." };
  }
}

async function web_search({
  query,
  num_results = 5,
}: {
  query: string;
  num_results?: number;
}) {
  if (!query || typeof query !== "string") {
    return { error: "Query is required as a string." };
  }
  try {
    const res: WikipediaSearchResponse = await withTimeout(
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&utf8=&format=json&origin=*&srlimit=${Math.min(num_results, 10)}`
      ).then((r) => r.json())
    );
    const items = res.query?.search ?? [];
    const results = items.map((it) => ({
      title: it.title,
      url: `https://en.wikipedia.org/?curid=${it.pageid}`,
      snippet: it.snippet?.replace(/<\/?[^>]+(>|$)/g, "") || "",
    }));
    return { query, results };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Search tool failed." };
  }
}

const SYMBOL_TO_ID: Record<string, string> = {
  btc: "bitcoin",
  eth: "ethereum",
  sol: "solana",
  doge: "dogecoin",
  xrp: "ripple",
  ada: "cardano",
  bnb: "binancecoin",
  matic: "polygon",
  usdt: "tether",
  usdc: "usd-coin",
};

async function get_crypto_price({
  symbol,
  vs_currency = "usd",
}: {
  symbol: string;
  vs_currency?: string;
}) {
  if (!symbol || typeof symbol !== "string") {
    return { error: "Symbol is required as a string (e.g., 'btc')." };
  }
  try {
    const id =
      SYMBOL_TO_ID[symbol.toLowerCase()] ||
      SYMBOL_TO_ID[symbol.replace("$", "").toLowerCase()];
    if (!id) {
      return {
        error:
          "Unknown symbol. Try common ones like btc, eth, sol, doge, xrp, ada, bnb, matic, usdt, usdc.",
      };
    }
    const res: CoinGeckoPriceResponse = await withTimeout(
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
          id
        )}&vs_currencies=${encodeURIComponent(vs_currency)}`
      ).then((r) => r.json())
    );
    const price = res?.[id]?.[vs_currency.toLowerCase()];
    if (price == null) return { error: "Price not available." };
    return { symbol, id, vs_currency, price };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Crypto tool failed." };
  }
}

function calc_sum({ numbers }: { numbers: number[] }) {
  if (!Array.isArray(numbers) || numbers.some((n) => typeof n !== "number")) {
    return { error: "numbers must be an array of numbers." };
  }
  const sum = numbers.reduce((a, b) => a + b, 0);
  return { sum, count: numbers.length };
}

function is_prime({ n }: { n: number }) {
  if (typeof n !== "number" || !Number.isFinite(n) || n % 1 !== 0 || n < 0) {
    return { error: "n must be a non-negative integer." };
  }
  if (n < 2) return { n, isPrime: false };
  if (n % 2 === 0) return { n, isPrime: n === 2 };
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return { n, isPrime: false };
  }
  return { n, isPrime: true };
}

function primes_between({
  start,
  end,
  limit = 100,
}: {
  start: number;
  end: number;
  limit?: number;
}) {
  if (
    typeof start !== "number" ||
    typeof end !== "number" ||
    start > end ||
    start < 0
  ) {
    return { error: "Invalid range. Provide start <= end, both >= 0." };
  }
  const maxCount = Math.min(Math.max(limit ?? 100, 1), 500);
  const primes: number[] = [];
  const isPrime = (x: number) => {
    if (x < 2) return false;
    if (x === 2) return true;
    if (x % 2 === 0) return false;
    for (let i = 3; i * i <= x; i += 2) {
      if (x % i === 0) return false;
    }
    return true;
  };
  for (let x = start; x <= end && primes.length < maxCount; x++) {
    if (isPrime(x)) primes.push(x);
  }
  return {
    start,
    end,
    count: primes.length,
    primes,
    truncated: primes.length >= maxCount,
  };
}

// Function Declarations for the model
const toolDeclarations: ToolDeclaration[] = [
  {
    name: "get_weather",
    description:
      "Gets current weather for a given location string (e.g., 'London', 'New York').",
    parameters: {
      type: Type.OBJECT,
      properties: {
        location: { type: Type.STRING, description: "City or place name." },
        unit: {
          type: Type.STRING,
          enum: ["celsius", "fahrenheit"],
          description: "Temperature unit. Default celsius.",
        },
      },
      required: ["location"],
    },
  },
  {
    name: "web_search",
    description:
      "Performs a web search and returns top results (uses Wikipedia as a demo source).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Search query text." },
        num_results: {
          type: Type.NUMBER,
          description: "Number of results (max 10).",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_crypto_price",
    description:
      "Gets live crypto price by symbol (e.g., 'btc', 'eth') in the requested fiat.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        symbol: { type: Type.STRING, description: "Crypto symbol like btc." },
        vs_currency: {
          type: Type.STRING,
          description: "Fiat currency like 'usd' (default).",
        },
      },
      required: ["symbol"],
    },
  },
  {
    name: "calc_sum",
    description: "Returns the sum for a list of numbers.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        numbers: {
          type: Type.ARRAY,
          items: { type: Type.NUMBER },
          description: "Array of numbers to add.",
        },
      },
      required: ["numbers"],
    },
  },
  {
    name: "is_prime",
    description: "Checks if a number is prime.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        n: { type: Type.NUMBER, description: "Integer to test." },
      },
      required: ["n"],
    },
  },
  {
    name: "primes_between",
    description:
      "Lists prime numbers in a range. Caps output to a reasonable limit.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        start: {
          type: Type.NUMBER,
          description: "Start of range (inclusive).",
        },
        end: { type: Type.NUMBER, description: "End of range (inclusive)." },
        limit: {
          type: Type.NUMBER,
          description: "Max primes to return (default 100, max 500).",
        },
      },
      required: ["start", "end"],
    },
  },
];

// Wrap implementations to satisfy ToolFunction signature
const toolFunctions: Record<string, ToolFunction> = {
  get_weather: (args) =>
    get_weather(args as { location: string; unit?: "celsius" | "fahrenheit" }),
  web_search: (args) =>
    web_search(args as { query: string; num_results?: number }),
  get_crypto_price: (args) =>
    get_crypto_price(args as { symbol: string; vs_currency?: string }),
  calc_sum: (args) => calc_sum(args as { numbers: number[] }),
  is_prime: (args) => is_prime(args as { n: number }),
  primes_between: (args) =>
    primes_between(args as { start: number; end: number; limit?: number }),
};

type ChatRequestBody = { history: AgentChatMessage[] };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const { history } = body || {};

    if (!history || !Array.isArray(history)) {
      return NextResponse.json(
        { error: "Invalid conversation history format - must be an array" },
        { status: 400 }
      );
    }

    for (const item of history) {
      if (
        !item ||
        (item.role !== "user" && item.role !== "model") ||
        !Array.isArray(item.parts)
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid item in history. Expect { role: 'user'|'model', parts: [...] }",
          },
          { status: 400 }
        );
      }
    }

    const finalText = await AIService.runAgent({
      history,
      toolDeclarations,
      toolFunctions,
      // toolConfig: { functionCallingConfig: { mode: "auto" } },
    });

    return NextResponse.json({ response: finalText });
  } catch (error: unknown) {
    console.error("AI Agent route error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
