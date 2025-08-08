import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  mainClassName?: string;
  maxWidthClass?: string; // e.g., "max-w-6xl" | "max-w-5xl"
  paddingYClass?: string; // e.g., "py-6 sm:py-8"
  topOffsetClass?: string; // e.g., "pt-16"
  bottomOffsetClass?: string; // e.g., "pb-24"
};

export default function PageLayout({
  children,
  mainClassName = "",
  maxWidthClass = "max-w-6xl",
  paddingYClass = "py-6 sm:py-8",
  topOffsetClass = "pt-10",
  bottomOffsetClass = "pb-24",
}: Props) {
  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] px-4 sm:px-6 md:px-8 ${bottomOffsetClass} ${topOffsetClass}`}
    >
      <div className={`${maxWidthClass} w-full mx-auto`}>
        <Header />
      </div>

      <main
        className={`flex-grow flex flex-col ${maxWidthClass} mx-auto w-full px-0 sm:px-4 ${paddingYClass} ${mainClassName}`}
      >
        {children}
      </main>

      <div className={`${maxWidthClass} w-full mx-auto`}>
        <Footer />
      </div>
    </div>
  );
}
