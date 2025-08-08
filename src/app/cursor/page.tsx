"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { IoSend } from "react-icons/io5";
import { FiCopy, FiDownload, FiRefreshCw } from "react-icons/fi";

export default function CursorAgent() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Create a blob URL for preview
  const previewUrl = useMemo(() => {
    if (!html) return "";
    const blob = new Blob([html], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [html]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cursor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setHtml(data.html as string);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {}
  };

  const downloadCode = () => {
    const blob = new Blob([html || ""], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "site.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setPrompt("");
    setHtml("");
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
          Cursor: Website Builder Agent
        </h1>
        <button
          onClick={clearAll}
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#353945] text-gray-300 hover:bg-[#4a4f5e] transition-colors"
        >
          <FiRefreshCw size={14} />
          <span>Reset</span>
        </button>
      </div>

      <div className="rounded-xl border border-[#353945] bg-[#0f1117]/70 backdrop-blur-sm p-3 sm:p-4 mb-4">
        <div className="flex gap-2 sm:gap-3 items-center">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generate();
              }
            }}
            placeholder="Describe the website (e.g., 'landing page for a coffee shop with hero, features, contact form')"
            className="flex-1 h-12 rounded-2xl border border-[#353945] bg-[#0f1117]/70 text-gray-200 px-4 outline-none focus:ring-1 focus:ring-red-500"
          />
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className={`px-4 h-12 rounded-2xl ${
              loading || !prompt.trim()
                ? "bg-[#353945] text-gray-500"
                : "bg-gradient-to-r from-red-400 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30"
            } transition-all flex items-center gap-2`}
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Generating…</span>
              </>
            ) : (
              <>
                <IoSend size={18} />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
        <div className="rounded-xl border border-[#353945] bg-[#0f1117]/70 backdrop-blur-sm overflow-hidden flex flex-col relative">
          <div className="flex items-center justify-between p-3 border-b border-[#353945]">
            <h2 className="text-sm text-gray-300">Generated Code (HTML)</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={copyCode}
                className="text-gray-300 hover:text-white flex items-center gap-1 text-sm"
              >
                <FiCopy /> Copy
              </button>
              <button
                onClick={downloadCode}
                className="text-gray-300 hover:text-white flex items-center gap-1 text-sm"
              >
                <FiDownload /> Download
              </button>
            </div>
          </div>
          <pre className="flex-1 overflow-auto p-3 text-xs sm:text-sm text-gray-200">
            <code>{html || "/* Generated HTML will appear here */"}</code>
          </pre>
          {loading && (
            <div className="absolute inset-0 bg-[#0f1117]/70 backdrop-blur-sm flex justify-center">
              <div className="flex h-[300px] items-center gap-2 text-gray-300 text-sm">
                <span className="inline-block w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Generating code… please wait</span>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[#353945] bg-[#0f1117]/70 backdrop-blur-sm overflow-hidden flex flex-col relative">
          <div className="flex items-center justify-between p-3 border-b border-[#353945]">
            <h2 className="text-sm text-gray-300">Live Preview</h2>
            {html && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-red-400 hover:underline"
              >
                Open in new tab ( Works best in new tab)
              </a>
            )}
          </div>
          {html ? (
            <iframe
              ref={iframeRef}
              title="preview"
              src={previewUrl}
              sandbox="allow-scripts allow-forms"
              className="flex-1 min-h-[360px] bg-white"
            />
          ) : (
            <div className="flex-1 min-h-[360px] flex  justify-center text-gray-500 text-sm">
              Your preview will appear here
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-[#0f1117]/70 backdrop-blur-sm flex  justify-center">
              <div className="flex h-[300px] items-center gap-2 text-gray-300 text-sm">
                <span className="inline-block w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Preparing preview…</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
