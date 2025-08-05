import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenAI Learning Hub | Understanding AI Fundamentals",
  description:
    "Learn how generative AI works from first principles, with clear explanations and practical examples for everyone.",
  keywords: [
    "generative AI",
    "AI learning",
    "machine learning",
    "artificial intelligence",
    "AI fundamentals",
    "LLMs",
    "tokenization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
