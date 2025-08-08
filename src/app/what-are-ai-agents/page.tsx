import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Are AI Agents? | Study Guide",
  description:
    "A simple guide to AI agents with practical examples, tool usage, and links to live demos.",
};

export default function WhatAreAIAgents() {
  return (
    <PageLayout mainClassName="max-w-5xl">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            What Are AI Agents?
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          The simplest way to think about AI agents: your normal app + an LLM +
          a few functions (&quot;tools&quot;) + a bit of logic that decides when
          to call them.
        </p>
      </div>

      {/* TL;DR */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm mb-8">
        <h2 className="text-xl font-semibold mb-2">Mental Model (TL;DR)</h2>
        <p className="text-gray-300">
          Think of an AI agent as
          <span className="text-gray-100 font-semibold">
            {" "}
            a traditional server app
          </span>
          {" + "}
          <span className="text-gray-100 font-semibold"> LLM integration</span>
          {" + "}
          <span className="text-gray-100 font-semibold"> function tools</span>.
          The model plans and explains; the tools do real work (math, API calls,
          etc.); your server glues it together.
        </p>
      </div>

      {/* Demos */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Hands‑on Demos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1c1f2a]/50 p-5 rounded-xl border border-[#353945]">
            <h3 className="font-semibold mb-1">AI Agent (with Tools)</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Chat that can use Weather, Web Search, Crypto Price, Math/Primes.
            </p>
            <Link
              href="/ai-agent"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-white text-sm font-medium hover:shadow-lg hover:shadow-red-500/20"
            >
              Open AI Agent
            </Link>
          </div>
          <div className="bg-[#1c1f2a]/50 p-5 rounded-xl border border-[#353945]">
            <h3 className="font-semibold mb-1">Website Builder</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Describe a site; it generates a single‑file HTML you can preview.
            </p>
            <Link
              href="/website-builder"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-white text-sm font-medium hover:shadow-lg hover:shadow-red-500/20"
            >
              Open Website Builder
            </Link>
          </div>
        </div>
      </div>

      {/* Learn by problems */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm mb-8">
        <h2 className="text-xl font-semibold mb-3">
          Understand AI Agents through Simple Problems
        </h2>
        <p className="text-gray-300 mb-4">
          Instead of abstract definitions, think in terms of tasks the agent can
          do via tools.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
            <h3 className="font-medium mb-2">1) Sum of two numbers</h3>
            <p className="text-gray-400 text-sm mb-2">
              A simple tool function:
            </p>
            <CodeBlock
              language="ts"
              code={`function sum(a: number, b: number) {
  return a + b;
}`}
            />
          </div>
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
            <h3 className="font-medium mb-2">2) Is a number prime?</h3>
            <p className="text-gray-400 text-sm mb-2">Another small tool:</p>
            <CodeBlock
              language="ts"
              code={`function isPrime(n: number) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}`}
            />
          </div>
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
            <h3 className="font-medium mb-2">3) Crypto price (API)</h3>
            <p className="text-gray-400 text-sm mb-2">
              Call a free API (e.g., CoinGecko):
            </p>
            <CodeBlock
              language="ts"
              code={`
async function getCryptoPrice(
symbol: string, vs = 'usd'
) {

  /* 

  fetch from API and return price
  e.g., https://api.coingecko.com/api/v3
  /simple/price?ids=bitcoin&vs_currencies=usd

  */
}`}
            />
          </div>
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
            <h3 className="font-medium mb-2">4) Weather for a city (API)</h3>
            <p className="text-gray-400 text-sm mb-2">
              Geocode + forecast API:
            </p>
            <CodeBlock
              language="ts"
              code={`
async function getWeather(
  city: string,
  unit: 'celsius' | 'fahrenheit' = 'celsius'
) 
{
  /*

   geocode the city, then fetch weather
   e.g., Open-Meteo geocoding 
   + forecast endpoints
   
   */
}`}
            />
          </div>
        </div>
      </div>

      {/* From input to tools */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm mb-8">
        <h2 className="text-xl font-semibold mb-3">
          From User Input to Function Calls
        </h2>
        <p className="text-gray-300 mb-3">
          The model reads the user message and decides if a tool is needed. If
          yes, your server calls the right function with structured args,
          returns the result to the model, and the model explains the final
          answer.
        </p>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          <li>
            &quot;is 97 prime?&quot; → call{" "}
            <span className="text-gray-100">isPrime(97)</span>
          </li>
          <li>
            &quot;btc price in usd&quot; → call{" "}
            <span className="text-gray-100">
              getCryptoPrice(&#39;btc&#39;,&#39;usd&#39;)
            </span>
          </li>
          <li>
            &quot;weather in London&quot; → call{" "}
            <span className="text-gray-100">getWeather(&#39;London&#39;)</span>
          </li>
        </ul>
      </div>

      {/* How it fits together */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm mb-10">
        <h2 className="text-xl font-semibold mb-3">How the Pieces Fit</h2>
        <ol className="list-decimal pl-5 text-gray-300 space-y-2">
          <li>
            Your <span className="text-gray-100">server/API routes</span> host
            small, reliable tool functions.
          </li>
          <li>
            The <span className="text-gray-100">LLM</span> handles language
            understanding and planning.
          </li>
          <li>
            A tiny <span className="text-gray-100">orchestrator</span> loop
            decides which tool to call, feeds results back to the model, and
            stops when a final answer is ready.
          </li>
          <li>
            Optional: add <span className="text-gray-100">context/memory</span>{" "}
            by keeping recent chat history.
          </li>
        </ol>
      </div>

      {/* Extra resources */}
      <div className="text-center">
        <div className="inline-flex gap-3">
          <Link
            href="/building-ai-chat-bots"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-4 py-2 text-sm text-white hover:bg-[#1c1f2a]/80"
          >
            Building AI Chatbots
          </Link>
          <Link
            href="/how-llm-works"
            className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-red-500/20"
          >
            How LLMs Work
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
