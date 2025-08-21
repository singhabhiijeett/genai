"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import PageLayout from "@/components/PageLayout";
import CodeBlock from "@/components/CodeBlock";

type MessagePart = { text: string };
type ChatMessage = {
  role: "user" | "model";
  parts: MessagePart[];
  timestamp?: number;
};

interface UploadedDocument {
  id: string;
  name: string;
  size?: number; // Optional for DB documents
  type?: string; // Optional for DB documents
  description?: string;
  pages?: number;
  chunks?: number;
  timestamp?: number;
  uploadedAt: string;
  isDefault?: boolean;
  fromDatabase?: boolean; // Flag to indicate if the document is from database
}

// Simple toast notification
type Toast = {
  id: string;
  message: string;
  type: "success" | "error";
};

// Create our own toast implementation
const toast = {
  success: (message: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type: "success" };
    // We'll handle this in the component
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: newToast,
      })
    );
    return id;
  },
  error: (message: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type: "error" };
    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: newToast,
      })
    );
    return id;
  },
};

export default function RAGSystem() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    UploadedDocument[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for toast events
  useEffect(() => {
    const handleToast = (e: Event) => {
      const toast = (e as CustomEvent<Toast>).detail;
      setToasts((prev) => [...prev, toast]);

      // Auto-remove toast after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };

    window.addEventListener("toast", handleToast);
    return () => window.removeEventListener("toast", handleToast);
  }, []);

  // Generate a session ID on component mount
  useEffect(() => {
    setSessionId(`session-${Date.now()}`);
  }, []);

  // Load saved messages from session storage and fetch documents from the database
  useEffect(() => {
    // Load chat history
    const saved = sessionStorage.getItem("rag-system-chat-history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial: ChatMessage = {
        role: "model",
        parts: [
          {
            text: "Hello! I'm your RAG-powered assistant. I can answer questions based on my knowledge base. Ask me anything about data structures, algorithms, or any topic in my knowledge base.",
          },
        ],
        timestamp: Date.now(),
      };
      setMessages([initial]);
      sessionStorage.setItem(
        "rag-system-chat-history",
        JSON.stringify([initial])
      );
    }

    // Load user's recently uploaded documents
    const savedDocs = sessionStorage.getItem("rag-system-documents");
    if (savedDocs) {
      const userDocs = JSON.parse(savedDocs);
      setUploadedDocuments(userDocs);
    }

    // Only load documents from the current session, don't fetch from database
    const loadSessionDocuments = () => {
      try {
        // Load user's recently uploaded documents
        const savedUserDocs = sessionStorage.getItem("rag-system-documents");
        if (savedUserDocs) {
          const userDocs = JSON.parse(savedUserDocs);
          setUploadedDocuments(userDocs);
        }
      } catch (error) {
        console.error("Error loading session documents:", error);
      }
    };

    loadSessionDocuments();
  }, []);

  // Save messages to session storage when they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(
        "rag-system-chat-history",
        JSON.stringify(messages)
      );
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: inputMessage }],
      timestamp: Date.now(),
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/rag-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputMessage,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to get response");
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        role: "model",
        parts: [{ text: data.response }],
        timestamp: Date.now(),
      };

      setMessages([...updated, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const aiMessage: ChatMessage = {
        role: "model",
        parts: [
          {
            text: "I encountered an error while retrieving information. Please try again or rephrase your question.",
          },
        ],
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const initial: ChatMessage = {
      role: "model",
      parts: [
        {
          text: "New session started! Ask me anything about the documents in my knowledge base.",
        },
      ],
      timestamp: Date.now(),
    };
    setMessages([initial]);
    setSessionId(`session-${Date.now()}`);
    sessionStorage.setItem(
      "rag-system-chat-history",
      JSON.stringify([initial])
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const response = await fetch("/api/rag-system/ingest", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload result:", result);

        // Add uploaded documents to state
        const newDocuments: UploadedDocument[] = Array.from(files).map(
          (file) => ({
            id: `doc-${Date.now()}-${Math.random()
              .toString(36)
              .substring(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            // Add estimated chunks and pages based on file size for better UI feedback
            chunks: Math.ceil(file.size / 1024 / 2), // Rough estimate
            pages: Math.ceil(file.size / 1024 / 4), // Very rough estimate
          })
        );

        // Get current user documents from session storage
        const savedUserDocs = sessionStorage.getItem("rag-system-documents");
        const userDocs = savedUserDocs ? JSON.parse(savedUserDocs) : [];

        // Add new documents to user's documents
        const updatedUserDocs = [...userDocs, ...newDocuments];

        // Save user's documents to session storage
        sessionStorage.setItem(
          "rag-system-documents",
          JSON.stringify(updatedUserDocs)
        );

        // Only show documents from the current session
        setUploadedDocuments(updatedUserDocs);

        setIsUploading(false);
        toast.success("Documents processed successfully!");
      } else {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to process documents. Please try again.");
      setIsUploading(false);
    }
  };

  const formatMessageContent = (text: string) => {
    // Find code blocks and wrap them
    const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;
    const parts = text.split(codeBlockRegex);

    if (parts.length === 1) {
      // No code blocks, just return the text with line breaks converted to <br>
      return <p className="whitespace-pre-wrap">{text}</p>;
    }

    const result = [];
    let i = 0;

    while (i < parts.length) {
      // Regular text
      if (parts[i]) {
        result.push(
          <p key={`text-${i}`} className="whitespace-pre-wrap">
            {parts[i]}
          </p>
        );
      }

      // Code block if we have a language and code content
      if (i + 2 < parts.length) {
        const language = parts[i + 1] || "javascript";
        const code = parts[i + 2];

        if (code) {
          result.push(
            <CodeBlock key={`code-${i}`} language={language} code={code} />
          );
        }

        i += 3; // Move past the language and code parts
      } else {
        i++;
      }
    }

    return <>{result}</>;
  };

  return (
    <PageLayout mainClassName="max-w-5xl">
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-lg animate-fadeIn max-w-xs ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white"
            }`}
          >
            <div className="flex items-center">
              {toast.type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <RiRobot2Line className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            RAG System
          </h1>
        </div>
        <div className="flex gap-2">
          {/* <Link
            href="/rag-system/salary-estimator"
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#353945] text-gray-300 hover:bg-[#4a4f5e] transition-colors hover:shadow-md hover:shadow-green-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Salary Estimator</span>
          </Link> */}
          <label
            htmlFor="document-upload"
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#353945] text-gray-300 hover:bg-[#4a4f5e] transition-colors hover:shadow-md hover:shadow-red-500/10 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>Upload PDF</span>
          </label>
          <input
            id="document-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="application/pdf"
          />
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#353945] text-gray-300 hover:bg-[#4a4f5e] transition-colors hover:shadow-md hover:shadow-red-500/10"
          >
            <FiRefreshCw size={14} />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Upload status message */}
      {isUploading && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-center">
          <div className="flex justify-center items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400"></div>
            <span>Uploading and processing document...</span>
          </div>
        </div>
      )}

      {/* Row 1: Document upload section (100% width) */}
      <div className="w-full mb-4">
        <div className="p-3 rounded-lg bg-[#1a1d23]/70 border border-[#353945]">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-white">
              Current Session Documents
            </h3>
            <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500/20 border border-red-500/30 text-red-300">
              {uploadedDocuments.length}{" "}
              {uploadedDocuments.length === 1 ? "document" : "documents"}
            </div>
          </div>

          {uploadedDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center  bg-[#1a1d23]/70 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-400 text-sm">No documents loaded yet</p>
            </div>
          ) : (
            <div className="max-h-[15vh] overflow-y-auto custom-scrollbar">
              {uploadedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center pl-2 py-2 bg-[#1a1d23]/70 rounded-md mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {doc.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {doc.type && `${doc.type}`}
                      {doc.size && ` • ${(doc.size / 1024).toFixed(1)} KB`}
                      {` • Uploaded ${new Date(
                        doc.uploadedAt
                      ).toLocaleDateString()}`}
                      {doc.chunks && ` • ${doc.chunks} chunks`}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center">
                    {doc.isDefault && (
                      <div className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 border border-red-500/30 text-red-300 mr-2">
                        Default
                      </div>
                    )}
                    <div className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 border border-green-500/30 text-green-300 mr-2">
                      Current Session
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-400 mt-2">
            {uploadedDocuments.length > 0 ? (
              <>
                The documents above are uploaded in your current session and
                available for queries. All documents are also stored in the
                vector database for future sessions.
              </>
            ) : (
              "Upload PDF documents to build your knowledge base and start asking questions about them."
            )}
          </p>
        </div>
      </div>

      {/* Row 2: Two-column layout for About RAG (30%) and Chat UI (70%) */}
      <div className="flex flex-col lg:flex-row lg:gap-6 lg:h-[calc(100vh-220px)] min-h-[550px]">
        {/* Left column - About RAG section (30% on desktop) */}
        <div className="lg:w-[30%] mb-4 lg:mb-0 flex flex-col">
          {/* About RAG Systems */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] border border-[#353945] h-full">
            <h2 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
              About RAG Systems
            </h2>
            <p className="text-gray-300 mb-2 text-sm">
              This RAG (Retrieval-Augmented Generation) system uses a knowledge
              base to provide accurate and contextual answers to your questions.
              It searches a vector database to retrieve relevant information
              before generating responses.
            </p>
            <div className="flex justify-center my-2">
              <div className="p-2 bg-[#1c1f2a] rounded-lg shadow-lg border border-[#353945]">
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center p-2">
                    <div className="w-10 h-10 mx-auto mb-2 bg-[#181a20] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M3 5h18v14h-18v-14zm9 12c.5 0 1-.5 1-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1zm-7-11v9h14v-9h-14z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-red-400">Documents</span>
                  </div>

                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8 5v14l11-7z" />
                  </svg>

                  <div className="text-center p-2">
                    <div className="w-10 h-10 mx-auto mb-2 bg-[#181a20] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-red-400">Vectors</span>
                  </div>

                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8 5v14l11-7z" />
                  </svg>

                  <div className="text-center p-2">
                    <div className="w-10 h-10 mx-auto mb-2 bg-[#181a20] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-red-400">AI Model</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-[#4a4f5e] pt-3">
              <h3 className="text-md font-semibold mb-2 text-red-400">
                How to use this system:
              </h3>
              <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                <li>
                  Click the <b className="text-red-400">Upload PDF</b> button to
                  add documents to the knowledge base
                </li>
                <li>
                  The system will process your document and split it into
                  semantic chunks
                </li>
                <li>
                  Each chunk is converted into a vector embedding and stored in
                  the database
                </li>
                <li>
                  Ask questions about your documents in the chat interface
                </li>
                <li>
                  The system will retrieve relevant context and generate
                  accurate answers
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Right side - Chat UI (70% on desktop) */}
        <div className="lg:w-[70%] flex flex-col h-full">
          {/* Chat messages container */}
          <div className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-[#353945] bg-gradient-to-b from-[#0f1117]/70 via-[#181a20]/60 to-[#1a1d23]/70 backdrop-blur-sm p-4 sm:p-5 mb-3 sm:mb-4 overscroll-contain h-[calc(100%-100px)] custom-scrollbar">
            <div className="flex flex-col gap-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } gap-2`}
                >
                  {message.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0 flex items-center justify-center mt-1">
                      <RiRobot2Line className="text-white text-sm" />
                    </div>
                  )}
                  <div
                    className={`
                  max-w-[85%] rounded-2xl p-3 animate-fadeIn shadow-sm
                  ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-tr-none"
                      : "bg-[#353945] text-gray-200 rounded-tl-none"
                  }
                `}
                  >
                    {formatMessageContent(message.parts[0].text)}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0 flex items-center justify-center mt-1">
                    <RiRobot2Line className="text-white text-sm" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl p-3 animate-fadeIn shadow-sm bg-[#353945] text-gray-200 rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-red-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div
            className="flex gap-2 sm:gap-3 items-center sticky bottom-0 z-10 rounded-xl border border-transparent  pb-3 pt-2"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.25rem)",
            }}
          >
            <div className="flex-grow relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about the knowledge base..."
                className="w-full h-14 py-4 rounded-2xl border border-[#353945] bg-[#191c24] text-gray-200 px-4 pr-12 outline-none focus:ring-1 focus:ring-red-500 transition-all resize-none overflow-hidden placeholder:text-gray-500"
                rows={1}
              />
              {!inputMessage.trim() && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs px-2 py-0.5 rounded-full bg-[#353945]/50">
                  Enter ⏎
                </div>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`p-3.5 rounded-full ${
                isLoading || !inputMessage.trim()
                  ? "bg-[#353945] text-gray-500"
                  : "bg-gradient-to-r from-red-400 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30"
              } transition-all`}
            >
              <IoSend size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center mt-3 gap-1.5">
            <div className="h-0.5 w-5 bg-[#353945] rounded-full"></div>
            <p className="text-xs text-gray-500 text-center">
              Powered by RAG with Pinecone and Gemini API.{" "}
              <span className="text-red-400">Chat history stored locally.</span>
            </p>
            <div className="h-0.5 w-5 bg-[#353945] rounded-full"></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
