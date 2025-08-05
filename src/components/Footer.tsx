import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 text-center text-sm text-gray-500">
      <p>
        © 2025 Personal GenAI Notes. My self-documentation journey to understand
        AI fundamentals.
      </p>
      <p className="mt-2">
        Created for personal learning and reference. All content compiled from
        my research.
      </p>
      <p className="mt-2">
        <a
          href="https://www.linkedin.com/in/abhiijeettsingh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:text-red-500 transition-colors"
        >
          Connect on LinkedIn
        </a>
      </p>
    </footer>
  );
}
