import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";

// Initialize the Google AI client
const googleAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const { profileId, location } = await request.json();

    if (!profileId || !location) {
      return NextResponse.json(
        { error: "Profile ID and location are required" },
        { status: 400 }
      );
    }

    // 1. Retrieve profile data from Pinecone
    const profileData = await retrieveProfileData(profileId);
    if (!profileData) {
      return NextResponse.json(
        { error: "Profile data not found" },
        { status: 404 }
      );
    }

    // 2. Generate salary estimate based on profile data and location
    const salaryEstimate = await generateSalaryEstimate(profileData, location);

    return NextResponse.json({
      salaryEstimate,
      profileId,
      location,
    });
  } catch (error) {
    console.error("Error in salary estimation:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}

// Function to retrieve profile data from Pinecone
async function retrieveProfileData(profileId: string): Promise<string> {
  try {
    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });

    const indexName = process.env.PINECONE_INDEX_NAME || "";
    const index = pinecone.index(indexName);

    // Get index stats to find namespace
    const stats = await index.describeIndexStats();
    let namespace = "";
    if (stats.namespaces) {
      const namespaces = Object.keys(stats.namespaces);
      if (namespaces.length > 0) {
        namespace = namespaces[0];
      }
    }

    // Get embeddings model
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: "text-embedding-004",
    });

    // Create a query to retrieve all chunks from this profile document
    const profileQuery = `LinkedIn profile document ${profileId}`;
    const queryVector = await embeddings.embedQuery(profileQuery);

    // Query Pinecone for all chunks of this profile
    const queryResult = await index.namespace(namespace).query({
      topK: 20, // Retrieve enough chunks to cover the whole profile
      includeMetadata: true,
      vector: queryVector,
      filter: { source: { $eq: profileId } }, // Filter by document ID
    });

    // Combine all text chunks into a complete profile
    let profileText = "";
    if (queryResult.matches && queryResult.matches.length > 0) {
      // Sort matches by metadata.chunk if available to reconstruct in order
      const sortedMatches = queryResult.matches.sort((a, b) => {
        const aChunk = a.metadata?.chunk ? Number(a.metadata.chunk) : 0;
        const bChunk = b.metadata?.chunk ? Number(b.metadata.chunk) : 0;
        return aChunk - bChunk;
      });

      // Extract and combine text
      profileText = sortedMatches
        .map(
          (match) => match.metadata?.pageContent || match.metadata?.text || ""
        )
        .join("\n\n");
    }

    if (!profileText) {
      console.error("No profile content found for ID:", profileId);
      return "No profile data found";
    }

    return profileText;
  } catch (error) {
    console.error("Error retrieving profile data:", error);
    return "Error retrieving profile data";
  }
}

// Function to generate salary estimate
async function generateSalaryEstimate(
  profileData: string,
  location: string
): Promise<string> {
  try {
    const prompt = `
You are a career and compensation expert. Based on the LinkedIn profile information below and the target location, provide a salary estimate range.

LinkedIn Profile:
${profileData}

Target Location: ${location}

Please provide:
1. A salary range estimation (both annual and monthly) based on the profile's skills, experience level, and the specified location
2. Key factors from the profile that influenced your estimate
3. Any additional skills or certifications that could increase their salary potential
4. Brief market insights about the demand for their skills in ${location}

Format your response in a clear, well-structured way with appropriate headings.
`;

    const response = await googleAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2, // Lower temperature for more accurate estimates
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text || "Unable to generate salary estimate";
  } catch (error) {
    console.error("Error generating salary estimate:", error);
    return "Error generating salary estimate. Please try again.";
  }
}
