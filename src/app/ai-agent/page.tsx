"use client";

import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import { IoSend } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { RiRobot2Line, RiMessage3Fill } from "react-icons/ri";

type MessagePart = { text: string };
type ChatMessage = {
  role: "user" | "model";
  parts: MessagePart[];
  timestamp?: number;
};

export default function AIAgent() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("ai-agent-chat-history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial: ChatMessage = {
        role: "model",
        parts: [
          {
            text: "Hey! I’m your AI Agent. I can use tools like Weather, Web Search, Crypto Prices, and Math/Primes.\n\nTry:\n- “weather in London in celsius”\n- “search: latest iPhone rumors”\n- “btc price in usd”\n- “sum 12, 45, 8, 5”\n- “is 97 prime?” or “primes between 50 and 100”",
          },
        ],
        timestamp: Date.now(),
      };
      setMessages([initial]);
      sessionStorage.setItem(
        "ai-agent-chat-history",
        JSON.stringify([initial])
      );
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("ai-agent-chat-history", JSON.stringify(messages));
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
      const response = await fetch("/api/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updated.map(({ role, parts }) => ({ role, parts })),
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
    } catch {
      const aiMessage: ChatMessage = {
        role: "model",
        parts: [
          {
            text: "I hit an error calling a tool. Please try again or rephrase your request.",
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
          text: "New session! Ask me about weather, search the web, crypto prices, or math/prime checks.",
        },
      ],
      timestamp: Date.now(),
    };
    setMessages([initial]);
    sessionStorage.setItem("ai-agent-chat-history", JSON.stringify([initial]));
  };

  return (
    <PageLayout mainClassName="max-w-5xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <RiRobot2Line className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            AI Agent
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

      <div className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-[#353945] bg-[#0f1117]/70 backdrop-blur-sm p-3 sm:p-4 mb-3 sm:mb-4 overscroll-contain md:flex-none md:min-h-[40vh] md:max-h-[65vh] lg:max-h-[60vh]">
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
                  <RiRobot2Line className="text-white text-sm" />
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
                <RiRobot2Line className="text-white text-sm" />
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

      <div
        className="flex gap-2 sm:gap-3 items-center sticky bottom-0 z-10 rounded-xl border border-transparent bg-gradient-to-t from-[#0f1117] via-[#0f1117]/90 to-transparent pb-3 pt-2"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.25rem)",
        }}
      >
        <div className="flex-grow relative">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask weather, search, crypto, math…"
            className="w-full h-12 leading-[3rem] rounded-2xl border border-[#353945] bg-[#0f1117]/70 text-gray-200 px-4 pr-12 outline-none focus:ring-1 focus:ring-red-500 transition-all resize-none overflow-hidden placeholder:text-gray-500 placeholder:leading-[3rem]"
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

      <div className="flex items-center justify-center mt-2 sm:mt-3 gap-1.5">
        <div className="h-0.5 w-5 bg-[#353945] rounded-full"></div>
        <p className="text-xs text-gray-500 text-center">
          AI Agent with tools: Weather, Web Search, Crypto, Math, Primes. Chat
          history stored locally.
        </p>
        <div className="h-0.5 w-5 bg-[#353945] rounded-full"></div>
      </div>
    </PageLayout>
  );
}
