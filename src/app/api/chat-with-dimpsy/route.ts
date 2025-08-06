import { NextResponse } from "next/server";
import { AIService } from "@/service/ai.service";

// Define the expected types for better type checking
type MessagePart = {
  text: string;
};

type ChatMessage = {
  role: string;
  parts: MessagePart[];
};

type ChatRequestBody = {
  history: ChatMessage[];
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = (await request.json()) as ChatRequestBody;

    // Extract conversation history
    const { history } = body;

    // Validate the history against the schema: { role: string; parts: { text: string }[] }[]
    if (!history || !Array.isArray(history)) {
      return NextResponse.json(
        { error: "Invalid conversation history format - must be an array" },
        { status: 400 }
      );
    }

    // Validate each item in the history array
    const isValidHistory = history.every((item): item is ChatMessage => {
      // Check if item has a valid role property
      if (!item || typeof item !== "object" || typeof item.role !== "string") {
        return false;
      }

      // Check if parts is a valid array
      if (!Array.isArray(item.parts)) {
        return false;
      }

      // Check each part has a text property of type string
      return item.parts.every(
        (part): part is MessagePart =>
          part &&
          typeof part === "object" &&
          part !== null &&
          "text" in part &&
          typeof part.text === "string"
      );
    });

    if (!isValidHistory) {
      return NextResponse.json(
        {
          error: "Invalid conversation history format",
          expected:
            "Array of objects with structure: { role: string; parts: { text: string }[] }[]",
        },
        { status: 400 }
      );
    }

    // Call the AI service to generate response
    const responseText = await AIService.generateText(history);

    // Return the response
    return NextResponse.json({ response: responseText });
  } catch (error: unknown) {
    console.error("Error in chat API route:", error);

    // Return a helpful error message
    return NextResponse.json(
      {
        error: "Failed to generate response",
        message:
          "If this issue persists, please contact Abhijeet as the API token may have expired.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
