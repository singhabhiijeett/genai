"use client";

import Link from "next/link";
import { RiBrainLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  const [learnOpen, setLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement | null>(null);

  // Close the Learn dropdown on outside click or route change
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    setLearnOpen(false);
  }, [pathname]);

  type NavItem = { label: string; href: string; cta?: boolean };
  const learnLinks: NavItem[] = [
    { label: "Introduction", href: "/introduction" },
    { label: "How LLM Works", href: "/how-llm-works" },
    { label: "Building AI Chatbots", href: "/building-ai-chat-bots" },
    { label: "What are AI Agents?", href: "/what-are-ai-agents" },
    { label: "What are Vectors?", href: "/what-are-vectors" },
    {
      label: "Vector Database Implementation",
      href: "/what-is-vector-database-and-internal-implementation",
    },
    { label: "RAG and LangChain", href: "/what-is-rag-and-langchain" },
  ];
  const navItems: NavItem[] = [
    { label: "Chat with Dimpsy", href: "/chat-with-dimpsy", cta: true },
    { label: "GeneralAI Agent", href: "/ai-agent", cta: true },
    { label: "Website Builder AI Agent", href: "/website-builder", cta: true },
    { label: "RAG System", href: "/rag-system", cta: true },
  ];

  const linkClasses = (href: string, cta?: boolean) => {
    const isActive = pathname === href;
    if (cta) {
      return [
        "px-3 py-1.5 rounded-lg transition-all",
        isActive
          ? "text-white bg-gradient-to-r from-red-500 to-red-600 shadow shadow-red-500/20"
          : "text-white bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/30",
      ].join(" ");
    }
    return [
      "px-3 py-1.5 rounded-lg border border-transparent text-gray-300 transition-colors",
      isActive
        ? "text-white bg-[#1c1f2a]/70 border-[#353945]"
        : "hover:text-white hover:bg-[#1c1f2a]/60",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#0f1117]/60 border-b border-[#353945]/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
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
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {/* Learn dropdown */}
          <div className="relative" ref={learnRef}>
            {(() => {
              const learnActive = learnLinks.some((l) => pathname === l.href);
              return (
                <>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={learnOpen}
                    onClick={() => setLearnOpen((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setLearnOpen(false);
                    }}
                    className={[
                      "px-3 py-1.5 rounded-lg border border-transparent text-gray-300 transition-colors inline-flex items-center gap-1",
                      learnActive
                        ? "text-white bg-[#1c1f2a]/70 border-[#353945]"
                        : "hover:text-white hover:bg-[#1c1f2a]/60",
                    ].join(" ")}
                  >
                    Learn <RiArrowDownSLine className="opacity-80" />
                  </button>
                  {learnOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-[#353945] bg-[#0f1117]/95 backdrop-blur shadow-lg shadow-black/30 p-1"
                    >
                      {learnLinks.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className={[
                            "block px-3 py-2 rounded-lg text-sm",
                            pathname === l.href
                              ? "text-white bg-[#1c1f2a]"
                              : "text-gray-200 hover:bg-[#1c1f2a]",
                          ].join(" ")}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Primary links */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClasses(item.href, item.cta)}
            >
              {item.label}
            </Link>
          ))}
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
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full mx-3 mt-2 rounded-xl border border-[#353945] bg-[#0f1117]/95 backdrop-blur p-2 shadow-lg shadow-black/30">
          <nav className="flex flex-col">
            {/* Learn section */}
            {learnLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={[
                    "px-3 py-3 rounded-lg",
                    isActive
                      ? "text-white bg-[#1c1f2a]"
                      : "text-gray-200 hover:bg-[#1c1f2a]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="my-1 h-px bg-[#353945]" />
            {/* Primary links */}
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isCta = item.cta;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={[
                    "px-3 py-3 rounded-lg",
                    isCta
                      ? isActive
                        ? "text-white bg-gradient-to-r from-red-500 to-red-600"
                        : "text-white bg-gradient-to-r from-red-500/90 to-red-600/90"
                      : isActive
                      ? "text-white bg-[#1c1f2a]"
                      : "text-gray-200 hover:bg-[#1c1f2a]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
