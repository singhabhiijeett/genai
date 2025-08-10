import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn GenAI | Personal Documentation & Notes",
  description:
    "Personal documentation on generative AI fundamentals, how they work, and the technology behind today's AI revolution.",
  keywords:
    "generative AI, AI learning, AI notes, machine learning, LLM, GenAI fundamentals, personal AI study",
  openGraph: {
    title: "Learn GenAI | Personal Documentation & Notes",
    description:
      "Understand the fundamentals of generative AI, how it works, and the technology behind today's AI revolution.",
    type: "website",
  },
};

export default function Home() {
  return (
    <PageLayout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            Learn GenAI
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A structured learning path to understand generative AI, from basic
          concepts to advanced implementations with hands-on projects and
          interactive demos.
        </p>
        <div className="mt-6 inline-flex bg-[#1c1f2a]/70 rounded-lg border border-[#353945] px-4 py-2 text-sm text-gray-400">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Follow the numbered learning path for the best learning experience
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
        GenAI Learning Path
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 w-full mb-8 sm:mb-12">
        {/* Card 1 - Introduction */}
        <Link
          href="/introduction"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #1
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                Introduction to GenAI
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                The foundations of generative AI - what it is, how it works, and
                why it matters in today&apos;s technology landscape.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 15 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Start Here</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card 2 - How LLM Works */}
        <Link
          href="/how-llm-works"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #2
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                How LLMs Work
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Deep dive into the architecture of Large Language Models,
                transformers, attention mechanisms, and the magic behind text
                generation.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 25 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Technical</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card 3 - Building AI Chatbots */}
        <Link
          href="/building-ai-chat-bots"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #3
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                Building AI Chatbots
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn how to create your own AI chatbots from scratch using
                modern frameworks and APIs.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 20 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Practical</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Demo - Chat with Dimpsy */}
        <Link
          href="/chat-with-dimpsy"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              DEMO
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                Chat with Dimpsy
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Have a conversation with Dimpsy, our custom AI assistant built
                to showcase natural language processing capabilities.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Interactive Demo
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Hands-on</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card 4 - What are AI Agents */}
        <Link
          href="/what-are-ai-agents"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #4
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                What are AI Agents?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Discover how AI agents work, their capabilities, and how they
                can be built to perform complex tasks autonomously.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 22 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Advanced</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Demo - AI Agent */}
        <Link
          href="/ai-agent"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              DEMO
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                AI Agent
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Experience an AI agent in action. See how autonomous agents can
                perform complex tasks by breaking them down into steps and using
                tools.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Interactive Demo
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Hands-on</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Demo - Website Builder */}
        <Link
          href="/website-builder"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              DEMO
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                Website Builder AI
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Experience our AI Website Builder that can generate full
                websites based on your description using advanced AI models.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Interactive Demo
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Hands-on</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card 5 - What are Vectors */}
        <Link
          href="/what-are-vectors"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #5
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                Vector Embedding & Database
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Understand how vector embeddings work and their crucial role in
                modern AI systems for semantic search and retrieval.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 18 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Technical</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card 6 - Vector Database Implementation */}
        <Link
          href="/what-is-vector-database-and-internal-implementation"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #6
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                Vector Database Implementation
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Deep dive into how vector databases are implemented internally,
                including indexing techniques and similarity search algorithms.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 30 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Advanced</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card 7 - RAG and LangChain */}
        <Link
          href="/what-is-rag-and-langchain"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              #7
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                RAG & LangChain
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn about Retrieval-Augmented Generation and how to build
                powerful AI systems that combine the strengths of language
                models with external knowledge retrieval.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Estimated reading time: 28 min
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Advanced</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Demo - RAG System */}
        <Link
          href="/rag-system"
          className="group bg-[#1c1f2a]/50 rounded-xl border border-[#353945] overflow-hidden hover:shadow-red-500/10 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
              DEMO
            </div>
            <div className="bg-gradient-to-r from-[#1a1d23]/80 via-[#1a1d23]/50 to-transparent absolute inset-0 z-0 group-hover:opacity-80 transition-opacity"></div>
            <div className="h-3 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <div className="p-6 relative z-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-red-400 transition-colors">
                RAG System
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Try our interactive Retrieval-Augmented Generation system.
                Upload your own documents and chat with them using the power of
                vector search and AI.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Interactive Demo
                </span>
                <span className="mx-2">•</span>
                <span className="text-red-400">Hands-on</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="border-t border-[#353945] pt-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
          Ready to Dive In?
        </h2>
        <div className="flex gap-4 sm:gap-6 items-center flex-col sm:flex-row">
          <Link
            href="/introduction"
            className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group"
          >
            <span className="relative z-10">Start Learning Path</span>
            <span className="absolute w-0 h-0 rounded-full bg-white opacity-10 group-hover:w-32 group-hover:h-32 -left-2 -top-2 transition-all duration-700 ease-out"></span>
          </Link>
          <Link
            href="/rag-system"
            className="rounded-lg bg-[#1c1f2a]/50 border border-red-500/30 px-6 py-3 font-medium text-red-400 transition-all duration-300 hover:bg-[#1c1f2a]/80 hover:border-red-500/50"
          >
            <span className="relative z-10">Try Interactive RAG Demo →</span>
          </Link>
          <Link
            href="/ai-agent"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#1c1f2a]/80"
          >
            <span className="relative z-10">Explore AI Agent</span>
          </Link>
          <Link
            href="/chat-with-dimpsy"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#1c1f2a]/80"
          >
            <span className="relative z-10">Chat with Dimpsy</span>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
