"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

type Props = {
  code: string;
  language?: "ts" | "tsx" | "js" | "json" | string;
  className?: string;
};

export default function CodeBlock({
  code,
  language = "ts",
  className = "",
}: Props) {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <pre
      className={`rounded-lg bg-[#0b0d13] border border-[#353945] p-3 overflow-auto text-xs sm:text-sm ${className}`}
    >
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
