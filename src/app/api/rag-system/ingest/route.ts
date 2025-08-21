import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { writeFile, unlink } from "fs/promises";

// Constants for chunking
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

// LinkedIn profile detection keywords
const LINKEDIN_KEYWORDS = [
  "linkedin.com",
  "work experience",
  "education",
  "skills",
  "certifications",
  "professional experience",
  "summary",
  "about",
  "accomplishments",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const isLinkedInProfile = formData.get("isLinkedInProfile") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Only accept PDF files
    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    // Create a buffer from the file
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Create a temporary file path
    const tempFilePath = `/tmp/${file.name}`;

    // Write the buffer to a temporary file
    await writeFile(tempFilePath, buffer);

    // 1. Load the PDF file
    const pdfLoader = new PDFLoader(tempFilePath);
    const rawDocs = await pdfLoader.load();

    console.log(`Loaded PDF with ${rawDocs.length} pages`);

    // Detect if it's a LinkedIn profile if not explicitly specified
    let profileDetected = isLinkedInProfile;

    if (!profileDetected) {
      // Check content for LinkedIn indicators
      const fullText = rawDocs
        .map((doc) => doc.pageContent)
        .join(" ")
        .toLowerCase();
      profileDetected = LINKEDIN_KEYWORDS.some((keyword) =>
        fullText.includes(keyword.toLowerCase())
      );
    }

    // 2. Create chunks from the document
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });

    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);

    console.log(`Created ${chunkedDocs.length} chunks from the document`);

    // 3. Initialize the embedding model
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY || "",
      model: "text-embedding-004",
    });

    // 4. Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    // Add document type and specific metadata to chunks
    for (let i = 0; i < chunkedDocs.length; i++) {
      // Add chunk number and document type to metadata
      chunkedDocs[i].metadata = {
        ...chunkedDocs[i].metadata,
        source: file.name,
        filename: file.name,
        chunk: i,
        uploadedAt: new Date().toISOString(),
        documentType: profileDetected ? "linkedin_profile" : "document",
      };
    }

    // 5. Embed chunks and upload to Pinecone
    console.log("Embedding documents and storing in Pinecone...");

    await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    // Clean up the temporary file
    await unlink(tempFilePath);

    return NextResponse.json({
      success: true,
      message: `Successfully processed and stored ${chunkedDocs.length} document chunks in the vector database`,
      totalPages: rawDocs.length,
      totalChunks: chunkedDocs.length,
      isLinkedInProfile: profileDetected,
      documentId: file.name,
    });
  } catch (error) {
    console.error("Error processing document:", error);

    return NextResponse.json(
      {
        error: "Failed to process and store document",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
