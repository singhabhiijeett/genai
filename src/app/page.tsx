import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <div className="font-sans min-h-screen bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] text-white pb-24 pt-16 px-4 sm:px-6 md:px-8 flex flex-col">
      <div className="max-w-6xl w-full mx-auto">
        <Header />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full px-0 sm:px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
              Learn GenAI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Understand the fundamentals of generative AI, how it works, and the
            technology behind today&apos;s AI revolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 w-full my-8 sm:my-12">
          {/* Feature Card 1 */}
          <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-red-500/10 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Core Concepts</h3>
            <p className="text-gray-400">
              Learn the fundamental principles that power generative AI models
              and how they work.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-red-500/10 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Model Architecture</h3>
            <p className="text-gray-400">
              Dive into the architecture of transformers, diffusion models, and
              other key AI frameworks.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-red-500/10 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hands-on Learning</h3>
            <p className="text-gray-400">
              Interactive examples and code demonstrations to help you
              understand AI in practice.
            </p>
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6 items-center flex-col sm:flex-row">
          <Link
            href="/introduction"
            className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group"
          >
            <span className="relative z-10">Start Learning</span>
            <span className="absolute w-0 h-0 rounded-full bg-white opacity-10 group-hover:w-32 group-hover:h-32 -left-2 -top-2 transition-all duration-700 ease-out"></span>
          </Link>
          <Link
            href="/how-llm-works"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#1c1f2a]/80"
          >
            <span className="relative z-10">LLM Reality Check</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
