"use client";

import Link from "next/link";
import { RiBrainLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-[#0f1117]/60 border-b border-[#353945]/60">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg sm:text-xl font-bold"
      >
        <RiBrainLine className="text-red-500 text-2xl" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
          GenAI Learning Hub
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6">
        <Link
          href="/introduction"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          Introduction
        </Link>

        <Link
          href="/how-llm-works"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          How LLM Works
        </Link>
        <Link
          href="/building-ai-chat-bots"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          Building AI Chatbots
        </Link>
        <Link
          href="/chat-with-dimpsy"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          Chat with Dimpsy
        </Link>
        <Link
          href="/website-builder"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          Website Builder AI Agent
        </Link>
        <Link
          href="/ai-agent"
          className="text-gray-100 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 px-3 py-1.5 rounded-lg hover:from-red-500/30 hover:to-red-600/30 transition-colors"
        >
          AI Agent
        </Link>
      </nav>

      {/* Mobile Toggle */}
      <button
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#353945] text-gray-200 hover:bg-[#1c1f2a]/70"
      >
        {open ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full mx-3 mt-2 rounded-xl border border-[#353945] bg-[#0f1117]/95 backdrop-blur p-3 shadow-lg shadow-black/30">
          <nav className="flex flex-col">
            <Link
              href="/introduction"
              onClick={closeMenu}
              className="px-3 py-3 rounded-lg text-gray-200 hover:bg-[#1c1f2a]"
            >
              Introduction
            </Link>
            <Link
              href="/building-ai-chat-bots"
              onClick={closeMenu}
              className="px-3 py-3 rounded-lg text-gray-200 hover:bg-[#1c1f2a]"
            >
              Building AI Chatbots
            </Link>
            <Link
              href="/how-llm-works"
              onClick={closeMenu}
              className="px-3 py-3 rounded-lg text-gray-200 hover:bg-[#1c1f2a]"
            >
              How LLM Works
            </Link>
            <Link
              href="/chat-with-dimpsy"
              onClick={closeMenu}
              className="px-3 py-3 rounded-lg text-gray-200 hover:bg-[#1c1f2a]"
            >
              Chat with Dimpsy
            </Link>
            <Link
              href="/website-builder"
              onClick={closeMenu}
              className="px-3 py-3 rounded-lg text-gray-200 hover:bg-[#1c1f2a]"
            >
              Website Builder AI Agent
            </Link>
            <Link
              href="/ai-agent"
              onClick={closeMenu}
              className="mt-1 px-3 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/30"
            >
              AI Agent
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
