"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IoSend } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { RiHeartsFill, RiMessage3Fill } from "react-icons/ri";

// Define types
type MessagePart = {
  text: string;
};

type ChatMessage = {
  role: string;
  parts: MessagePart[];
  timestamp?: number;
};

export default function ChatWithDimpsy() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    // Try to load messages from session storage
    const savedMessages = sessionStorage.getItem("dimpsy-chat-history");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Set initial welcome message if no history exists
      const initialMessage: ChatMessage = {
        role: "model",
        parts: [
          {
            text: "Heyyy bestie! ✨ It's your girl Dimpsy here! What's the vibe today? Spill the tea or just say hi, I'm literally so excited to chat with you! 💕",
          },
        ],
        timestamp: Date.now(),
      };
      setMessages([initialMessage]);
      sessionStorage.setItem(
        "dimpsy-chat-history",
        JSON.stringify([initialMessage])
      );
    }
  }, []);

  // Save messages to session storage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("dimpsy-chat-history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll to bottom on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: inputMessage }],
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call API with full message history
      const response = await fetch("/api/chat-with-ex-girlfriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: updatedMessages.map(({ role, parts }) => ({ role, parts })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage: ChatMessage = {
        role: "model",
        parts: [{ text: data.response }],
        timestamp: Date.now(),
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        role: "model",
        parts: [
          {
            text: "Omg bestie, I'm literally having a moment rn and can't respond. Can we try again in a sec? 😭",
          },
        ],
        timestamp: Date.now(),
      };

      setMessages([...updatedMessages, errorMessage]);
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
    const initialMessage: ChatMessage = {
      role: "model",
      parts: [
        {
          text: "Heyyy bestie! ✨ Fresh start! It's your girl Dimpsy here! What's the tea today? 💕",
        },
      ],
      timestamp: Date.now(),
    };

    setMessages([initialMessage]);
    sessionStorage.setItem(
      "dimpsy-chat-history",
      JSON.stringify([initialMessage])
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] p-8 pb-20">
      <div className="max-w-6xl w-full mx-auto px-4">
        <Header />
      </div>
      <main className="flex-grow flex flex-col max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <RiHeartsFill className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
              Chat with Dimpsy
            </h1>
          </div>
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#353945] text-gray-300 hover:bg-[#4a4f5e] transition-colors hover:shadow-md hover:shadow-red-500/10"
          >
            <FiRefreshCw size={14} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="h-[calc(100vh-280px)] overflow-y-auto rounded-xl border border-[#353945] bg-[#0f1117]/70 backdrop-blur-sm p-4 mb-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } gap-2`}
              >
                {message.role !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0 flex items-center justify-center">
                    <RiHeartsFill className="text-white text-sm" />
                  </div>
                )}
                <div
                  className={`
                    max-w-[80%] rounded-2xl p-3 animate-fadeIn shadow-sm
                    ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-tr-none"
                        : "bg-[#353945] text-gray-200 rounded-tl-none"
                    }
                  `}
                >
                  <p className="whitespace-pre-wrap">{message.parts[0].text}</p>
                  {message.timestamp && (
                    <p
                      className={`text-xs mt-1 opacity-70 text-right ${
                        message.role === "user"
                          ? "text-gray-200"
                          : "text-gray-400"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[#353945] flex-shrink-0 flex items-center justify-center">
                    <RiMessage3Fill className="text-gray-300 text-sm" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end justify-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0 flex items-center justify-center animate-pulse">
                  <RiHeartsFill className="text-white text-sm" />
                </div>
                <div className="bg-[#353945] rounded-2xl p-4 rounded-tl-none shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex gap-3 items-center sticky bottom-0">
          <div className="flex-grow relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Dimpsy..."
              className="w-full rounded-2xl border border-[#353945] bg-[#0f1117]/70 text-gray-200 py-3 px-4 outline-none focus:ring-1 focus:ring-red-500 transition-all resize-none"
              rows={1}
            />
            {!inputMessage.trim() && (
              <div className="absolute right-4 top-3 text-gray-500 text-xs px-2 py-0.5 rounded-full bg-[#353945]/50">
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
            Chat with Dimpsy, your virtual Gen-Z girlfriend. Your chat history
            is stored locally in your browser.
          </p>
          <div className="h-0.5 w-5 bg-[#353945] rounded-full"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
