import { Pinecone } from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });

    // Hard-code the index name to match what's used in the ingest route
    const indexName = process.env.PINECONE_INDEX_NAME || ""; // Based on your log output
    const index = pinecone.index(indexName);

    // Extract unique document names from metadata
    const documents = new Map();

    // Get index stats which includes total vector count
    const stats = await index.describeIndexStats();

    // Look at what namespaces exist

    // Get the first available namespace, default to empty namespace if none found
    let namespace = "";
    if (stats.namespaces) {
      const namespaces = Object.keys(stats.namespaces);
      if (namespaces.length > 0) {
        namespace = namespaces[0]; // Use the first available namespace
      }
    }

    try {
      // Check if we have any vectors to query in this namespace
      if (
        stats.namespaces &&
        stats.namespaces[namespace] &&
        stats.namespaces[namespace].recordCount > 0
      ) {
        console.log(
          `Found ${stats.namespaces[namespace].recordCount} records in namespace ${namespace}`
        );

        // Get the dimension from the index stats
        const dimension = stats.dimension || 768;
        // If we have vectors, do the query without the problematic empty filter
        console.log(`Using dimension: ${dimension}`);

        const queryResult = await index.namespace(namespace).query({
          topK: 100,
          includeMetadata: true,
          vector: Array(dimension).fill(0), // Use a zero vector to get random results
        });

        // Process query matches
        if (queryResult.matches && queryResult.matches.length > 0) {
          console.log(`Found ${queryResult.matches.length} matches`);

          queryResult.matches.forEach((match) => {
            console.log("Match metadata:", match.metadata);

            // Try to get document name from metadata
            let documentName = "unknown-document";

            if (match.metadata) {
              // First try to get from source field
              if (match.metadata.source) {
                const source = match.metadata.source as string;
                documentName = source.split("/").pop() || source;
              }
              // If no source, try filename
              else if (match.metadata.filename) {
                documentName = match.metadata.filename as string;
              }
              // If no filename, try to use the ID
              else if (match.id) {
                documentName = match.id;
              }

              if (!documents.has(documentName)) {
                documents.set(documentName, {
                  id: documentName,
                  name: documentName,
                  // Use metadata if available
                  description:
                    match.metadata.description || "Uploaded document",
                  pages: match.metadata.pageCount || undefined,
                  chunks: 1, // Start counting chunks
                  timestamp: match.metadata.timestamp || Date.now(),
                  uploadedAt:
                    match.metadata.uploadedAt || new Date().toISOString(),
                });
              } else {
                // Increment chunk count for existing document
                const doc = documents.get(documentName);
                doc.chunks += 1;
                documents.set(documentName, doc);
              }
            } else {
              console.log("Match has no metadata:", match.id);
            }
          });
        } else {
          console.log("No matches found in the query results");
        }
      } else {
        console.log("No documents found in namespace:", namespace);
      }
    } catch (queryError) {
      console.error("Query error:", queryError);
      // Continue with empty documents array if query fails
    }

    return NextResponse.json({
      documents: Array.from(documents.values()),
      totalDocuments: documents.size,
      totalVectors: stats.totalRecordCount,
      namespaces: stats.namespaces,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch documents",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
