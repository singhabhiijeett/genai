import Link from "next/link";
import { RiBrainLine } from "react-icons/ri";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <RiBrainLine className="text-red-500 text-2xl" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
          GenAI Learning Hub
        </span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link
          href="/introduction"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          Introduction
        </Link>
        <Link
          href="/chat-with-dimpsy"
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          Chat with Dimpsy
        </Link>
      </nav>
    </header>
  );
}
