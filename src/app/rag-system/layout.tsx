import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAG System | Upload and Chat with Documents",
  description:
    "Experience a Retrieval-Augmented Generation system that allows you to upload PDFs and chat with your own documents using AI.",
  keywords:
    "RAG system, retrieval-augmented generation, document AI, vector database, Pinecone, document chat, PDF chat",
  openGraph: {
    title: "RAG System | Upload and Chat with Documents",
    description:
      "Upload PDF documents and chat with them using our advanced AI system with Retrieval-Augmented Generation technology.",
    type: "website",
  },
};

export default function RagSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
