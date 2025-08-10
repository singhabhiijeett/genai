import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";
import { AgentChatMessage } from "@/service/ai.service";

// Initialize the Google AI client
const googleAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// Initialize history array for conversation context
const conversationHistory: Record<string, AgentChatMessage[]> = {};

/**
 * Transform a user query into a standalone question using conversational context
 */
async function transformQuery(
  question: string,
  sessionId: string
): Promise<string> {
  // Get or initialize conversation history
  const history = conversationHistory[sessionId] || [];

  if (history.length <= 1) {
    // If this is the first question, no need to transform
    return question;
  }

  // Add user question to a temporary history for query transformation
  const tempHistory = [
    ...history.slice(-4), // Use last 4 messages for context
    {
      role: "user",
      parts: [{ text: question }],
    },
  ];

  try {
    const response = await googleAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: tempHistory,
      config: {
        systemInstruction: `You are a query rewriting expert. Based on the provided chat history, 
        rephrase the most recent user question into a complete, standalone question that can be 
        understood without the chat history. Only output the rewritten question and nothing else.`,
      },
    });

    return response.text || question;
  } catch (error) {
    console.error("Error transforming query:", error);
    return question; // Fallback to original question if transformation fails
  }
}

/**
 * Search for relevant documents in the vector database
 */
async function searchVectorDB(query: string): Promise<string> {
  try {
    // 1. Convert query to embedding vector
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: "text-embedding-004",
    });

    const queryVector = await embeddings.embedQuery(query);

    // 2. Search Pinecone vector database
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    const searchResults = await pineconeIndex.query({
      topK: 5, // Retrieve top 5 most relevant chunks
      vector: queryVector,
      includeMetadata: true,
    });

    // 3. Extract and concatenate text from search results
    const context = searchResults.matches
      .map((match, index) => {
        const metadata = match.metadata as {
          text?: string;
          pageContent?: string;
        };
        const text = metadata.text || metadata.pageContent || "";
        const score = match.score
          ? ` (relevance: ${Math.round(match.score * 100)}%)`
          : "";
        return `Document chunk ${index + 1}${score}:\n${text}`;
      })
      .join("\n\n---\n\n");

    return context || "No relevant information found.";
  } catch (error) {
    console.error("Error searching vector database:", error);
    return "Error: Could not search knowledge base.";
  }
}

/**
 * Generate a response based on the context and user question
 */
async function generateResponse(
  question: string,
  context: string,
  sessionId: string
): Promise<string> {
  // Get or initialize conversation history
  const history = conversationHistory[sessionId] || [];

  // Add user question to history
  history.push({
    role: "user",
    parts: [{ text: question }],
  });

  try {
    // Generate response with RAG context
    const response = await googleAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: history,
      config: {
        systemInstruction: `You are a helpful AI assistant powered by RAG (Retrieval-Augmented Generation).
        
        You will be given a context of relevant information retrieved from a knowledge base and a user question.
        Your task is to answer the user's question based primarily on the provided context.
        
        If the context contains the information needed:
        - Provide a comprehensive, accurate answer based on the context
        - Cite the specific parts of the context you're using in your answer
        - Keep your tone helpful, clear, and educational
        
        If the answer is not in the context:
        - Say "I don't have specific information about that in my knowledge base"
        - You may then provide a general answer based on your general knowledge
        - Clearly indicate when you're using general knowledge vs. the specific context
        
        Context for this query:
        ${context}`,
      },
    });

    const responseText = response.text || "I couldn't generate a response.";

    // Save model response to history
    history.push({
      role: "model",
      parts: [{ text: responseText }],
    });

    // Update conversation history
    conversationHistory[sessionId] = history;

    return responseText;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I encountered an error while processing your request. Please try again.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, sessionId = "default" } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // 1. Transform the query using conversation context
    const transformedQuery = await transformQuery(question, sessionId);

    // 2. Search the vector database for relevant context
    const context = await searchVectorDB(transformedQuery);

    // 3. Generate the response using the retrieved context
    const response = await generateResponse(question, context, sessionId);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in RAG system:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
