import React from "react";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "What is RAG and LangChain | Understanding Retrieval-Augmented Generation",
  description:
    "Learn about Retrieval-Augmented Generation (RAG) systems and how LangChain helps build them. Understand how RAG solves knowledge limitations in LLMs.",
  keywords:
    "RAG, Retrieval-Augmented Generation, LangChain, vector database, embeddings, LLM, RAG system, knowledge retrieval",
  openGraph: {
    title: "Understanding RAG and LangChain",
    description:
      "Learn how Retrieval-Augmented Generation (RAG) systems enhance AI by retrieving and using external knowledge sources.",
    type: "website",
  },
};

export default function WhatIsRagAndLangchain() {
  return (
    <PageLayout>
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
        RAG System
      </h1>

      <div className="flex justify-center my-6">
        <div className="p-4 bg-[#1c1f2a] rounded-lg shadow-lg border border-[#353945] max-w-3xl">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Document Processing */}
            <div className="text-center p-3 bg-[#181a20]/50 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">
                Document Processing
              </h4>
              <div className="flex flex-col gap-3 items-center">
                <div className="w-16 h-16 bg-[#181a20] rounded-md flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
                    />
                  </svg>
                </div>
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 9l-7 7-7-7 1.4-1.4 5.6 5.6 5.6-5.6L19 9z"
                  />
                </svg>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-[#181a20] rounded-md flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M3 3h18v2H3V3m0 4h18v2H3V7m0 4h8v2H3v-2m0 4h8v2H3v-2m0 4h8v2H3v-2z"
                      />
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-[#181a20] rounded-md flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M3 3h18v2H3V3m0 4h18v2H3V7m0 4h8v2H3v-2m0 4h8v2H3v-2m0 4h8v2H3v-2z"
                      />
                    </svg>
                  </div>
                </div>
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 9l-7 7-7-7 1.4-1.4 5.6 5.6 5.6-5.6L19 9z"
                  />
                </svg>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-[#181a20] rounded-md flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"
                      />
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-[#181a20] rounded-md flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Right */}
            <div className="hidden md:block">
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"
                />
              </svg>
            </div>

            {/* Down Arrow for Mobile */}
            <div className="block md:hidden">
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 4v12.17l-5.59-5.59L4 12l8 8 8-8-1.41-1.41L13 16.17V4h-2z"
                />
              </svg>
            </div>

            {/* Vector Database */}
            <div className="text-center p-3 bg-[#181a20]/50 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">
                Vector Database
              </h4>
              <div className="w-20 h-20 mx-auto bg-[#181a20] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4m0 2c3.31 0 6 1.34 6 3s-2.69 3-6 3-6-1.34-6-3 2.69-3 6-3M4 9c0 2.21 3.59 4 8 4s8-1.79 8-4v3c0 2.21-3.59 4-8 4s-8-1.79-8-4v-3m0 5c0 2.21 3.59 4 8 4s8-1.79 8-4v3c0 2.21-3.59 4-8 4s-8-1.79-8-4v-3z"
                  />
                </svg>
              </div>
              <div className="mt-2 p-2 bg-[#181a20] rounded-md">
                <div className="text-xs text-gray-300">
                  [0.1, 0.8, -0.2, ...]
                </div>
              </div>
            </div>

            {/* Arrow Right */}
            <div className="hidden md:block">
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"
                />
              </svg>
            </div>

            {/* Down Arrow for Mobile */}
            <div className="block md:hidden">
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 4v12.17l-5.59-5.59L4 12l8 8 8-8-1.41-1.41L13 16.17V4h-2z"
                />
              </svg>
            </div>

            {/* Response Generation */}
            <div className="text-center p-3 bg-[#181a20]/50 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">
                Response Generation
              </h4>
              <div className="flex flex-col gap-3 items-center">
                <div className="w-16 h-12 bg-[#181a20] rounded-md flex items-center justify-center">
                  <div className="text-xs text-white">User Query</div>
                </div>
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 9l-7 7-7-7 1.4-1.4 5.6 5.6 5.6-5.6L19 9z"
                  />
                </svg>
                <div className="w-16 h-12 bg-[#181a20] rounded-md flex items-center justify-center">
                  <div className="text-xs text-white">Context Retrieval</div>
                </div>
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 9l-7 7-7-7 1.4-1.4 5.6 5.6 5.6-5.6L19 9z"
                  />
                </svg>
                <div className="w-16 h-12 bg-[#181a20] rounded-md flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 font-bold text-white">
            RAG System Architecture
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Part 1: The &quot;Why&quot; - Why Do We Even Need RAG?
        </h2>

        <p className="mb-4">
          Before we dive into what RAG is, let&apos;s understand the problem it
          solves. Imagine you&apos;re talking to a standard, off-the-shelf LLM
          like ChatGPT. These models are incredibly smart, but they have a few
          fundamental limitations:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong className="text-red-400">The Knowledge Cutoff:</strong> An
            LLM&apos;s knowledge is frozen in time. The model I am based on was
            trained on data up to a certain point. If you ask me about events
            that happened after that date, I won&apos;t know about them.
            <div className="bg-[#1c1f2a]/50 p-3 rounded-lg mt-2 text-sm">
              <strong>Example:</strong> If you ask, &quot;Who won the 2025 Oscar
              for Best Picture?&quot;, a standard LLM trained until 2023 would
              have no idea.
            </div>
          </li>

          <li>
            <strong className="text-red-400">Hallucinations:</strong> Sometimes,
            when an LLM doesn&apos;t know the answer, it
            &quot;hallucinates&quot; – it makes up a plausible-sounding but
            completely false answer. It does this because its main goal is to
            predict the next most likely word, not necessarily to be truthful.
          </li>

          <li>
            <strong className="text-red-400">Lack of Specificity:</strong> A
            general-purpose LLM doesn&apos;t know about your private or specific
            data. It hasn&apos;t read your company&apos;s internal documents,
            your personal study notes, or a niche scientific domain&apos;s
            latest research papers.
          </li>
        </ul>

        <p className="mb-4">
          So, the core problem is:{" "}
          <strong>
            How can we make an LLM answer questions using up-to-date, specific,
            or private information without it making things up?
          </strong>
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Part 2: The &quot;What&quot; - Introducing Our Solution: RAG
        </h2>

        <p className="mb-4">
          This is where RAG comes in.
          <strong> RAG stands for Retrieval-Augmented Generation.</strong>
        </p>

        <p className="mb-4">Let&apos;s break down that name:</p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong className="text-red-400">Retrieval:</strong> This means
            &quot;to find and get information.&quot; Think of retrieving a book
            from a library.
          </li>

          <li>
            <strong className="text-red-400">Augmented:</strong> This means
            &quot;to enhance or add to.&quot; We are adding the information we
            found to something else.
          </li>

          <li>
            <strong className="text-red-400">Generation:</strong> This is what
            LLMs do best – they generate text (words, sentences, answers).
          </li>
        </ul>

        <p className="mb-6">
          So, in simple terms, RAG is a technique that first retrieves relevant
          information from an external knowledge source and then augments (adds)
          that information to the user&apos;s question before asking the LLM to
          generate the final answer.
        </p>

        <div className="bg-gradient-to-r from-[#1c1f2a]/70 to-[#2a2f3a]/70 p-4 rounded-lg border border-[#353945] mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-400">
            Analogy: The Open-Book Exam
          </h3>
          <p className="mb-2">
            Imagine you have a very smart student (the LLM) who has to take an
            exam.
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>
              A standard LLM is like a student taking the exam from memory
              alone. They know a lot, but they might forget things, get details
              wrong, or not know about very specific topics.
            </li>
            <li>
              A RAG system is like that same student taking an open-book exam.
              Before answering a question, the student can look through the
              official textbook (the external knowledge source) to find the
              exact, correct information. They then use that information to
              write a perfect, fact-based answer.
            </li>
          </ul>
          <p>
            RAG gives the LLM a &quot;textbook&quot; to consult in real-time.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Part 3: The &quot;How&quot; - A Step-by-Step Guide to the RAG Pipeline
        </h2>

        <p className="mb-4">
          This is the core of our lesson. The RAG process can be split into two
          main phases.
        </p>

        <h3 className="text-xl font-semibold mb-3">
          Phase A: The Preparation (Indexing the Knowledge)
        </h3>

        <p className="mb-4">
          This is the &quot;studying&quot; phase that happens before the user
          ever asks a question. We need to prepare our &quot;textbook&quot; or
          knowledge base so it&apos;s easy to search.
        </p>

        <ol className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong className="text-red-400">Load Documents:</strong> First, we
            gather our knowledge source. This could be anything: a set of PDFs,
            a company&apos;s internal website, a database of customer support
            tickets, or a collection of medical research papers.
          </li>

          <li>
            <strong className="text-red-400">Chunking:</strong> We can&apos;t
            give the LLM an entire 500-page book at once. It&apos;s too much
            information. So, we break the documents down into smaller,
            manageable pieces, or &quot;chunks.&quot; These could be paragraphs,
            pages, or sections of a certain size.
          </li>

          <li>
            <strong className="text-red-400">
              Create Embeddings (The Magic Step):
            </strong>{" "}
            This is a crucial concept. We need a way for the computer to
            understand the meaning of our text chunks. We use a special model
            called an Embedding Model to convert each text chunk into a list of
            numbers, called a vector.
            <div className="bg-[#1c1f2a]/50 p-3 rounded-lg mt-2 text-sm">
              Think of these vectors as a kind of &quot;GPS coordinate&quot; for
              meaning. Chunks of text with similar meanings will have vectors
              that are &quot;close&quot; to each other in mathematical space.
              For example, the vector for &quot;How much does a car cost?&quot;
              will be very close to the vector for &quot;What is the price of an
              automobile?&quot;.
            </div>
          </li>

          <li>
            <strong className="text-red-400">
              Store in a Vector Database:
            </strong>{" "}
            We take all these vectors (and their corresponding text chunks) and
            store them in a special kind of database designed for incredibly
            fast searching of vectors. This is our searchable library. Popular
            vector databases include Pinecone, Chroma, and FAISS.
          </li>
        </ol>

        <p className="mb-6">
          This preparation phase is a one-time setup (though you can update it
          with new documents later). Our library is now ready.
        </p>

        <h3 className="text-xl font-semibold mb-3">
          Phase B: The Real-Time Process (Answering a Question)
        </h3>

        <p className="mb-4">This happens every time a user submits a query.</p>

        <ol className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong className="text-red-400">User Query:</strong> The user asks
            a question, for example: &quot;What are the new HR policies on
            remote work for 2025?&quot;
          </li>

          <li>
            <strong className="text-red-400">Embed the Query:</strong> We use
            the exact same embedding model from the preparation phase to convert
            the user&apos;s question into a vector.
          </li>

          <li>
            <strong className="text-red-400">Search/Retrieve:</strong> Now, we
            take the user&apos;s query vector and use it to search our vector
            database. The database performs a similarity search to find the text
            chunk vectors that are mathematically closest to the query vector.
            It pulls out, say, the top 3-5 most relevant chunks.
            <div className="bg-[#1c1f2a]/50 p-3 rounded-lg mt-2 text-sm">
              In our example, it would find the chunks of text from our HR
              documents that talk about &quot;remote work,&quot; &quot;work from
              home,&quot; and &quot;2025 policies.&quot;
            </div>
          </li>

          <li>
            <strong className="text-red-400">Augment the Prompt:</strong> This
            is the key &quot;Augmented&quot; part of RAG. We don&apos;t just
            send the user&apos;s question to the LLM. Instead, we construct a
            new, more detailed prompt. It looks something like this:
            <div className="bg-[#1c1f2a] p-4 rounded-lg mt-2 text-sm mb-4 border border-[#353945]">
              <strong>CONTEXT:</strong>
              <br />
              <ul className="list-disc pl-6 mb-2 space-y-2">
                <li>
                  &quot;[Chunk 1: ...the new policy for 2025 states that
                  employees can work remotely up to 3 days a week...]&quot;
                </li>
                <li>
                  &quot;[Chunk 2: ...approval for remote work must be obtained
                  from a direct manager...]&quot;
                </li>
                <li>
                  &quot;[Chunk 3: ...all remote work must be conducted from
                  within the country...]&quot;
                </li>
              </ul>
              <strong>QUESTION:</strong>
              <br />
              &quot;What are the new HR policies on remote work for 2025?&quot;
              <br />
              <br />
              <strong>INSTRUCTION:</strong>
              <br />
              &quot;Based only on the context provided above, answer the
              user&apos;s question.&quot;
            </div>
          </li>

          <li>
            <strong className="text-red-400">Generate the Answer:</strong> We
            send this entire augmented prompt to the LLM. The LLM now has all
            the factual information it needs right in front of it. It
            doesn&apos;t need to rely on its old, internal memory. It can now
            generate a precise, factual answer based only on the provided
            context.
            <div className="bg-[#1c1f2a]/50 p-3 rounded-lg mt-2 text-sm">
              <strong>Final Answer:</strong> &quot;According to the new HR
              policies for 2025, employees are permitted to work remotely for up
              to three days per week. This requires approval from a direct
              manager and must be conducted from within the country.&quot;
            </div>
          </li>
        </ol>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Part 4: The Payoff - Why is RAG a Big Deal?
        </h2>

        <p className="mb-4">
          Let&apos;s circle back to our original problems and see how RAG solves
          them:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong className="text-red-400">Solves Knowledge Cutoff:</strong>{" "}
            You can constantly update your vector database with new documents.
            The LLM&apos;s knowledge is no longer frozen; it&apos;s as fresh as
            your data.
          </li>

          <li>
            <strong className="text-red-400">Reduces Hallucinations:</strong> By
            instructing the LLM to answer only based on the provided context,
            you dramatically reduce its tendency to make things up. It&apos;s
            &quot;grounded&quot; in your documents.
          </li>

          <li>
            <strong className="text-red-400">
              Enables Domain-Specific & Private Knowledge:
            </strong>{" "}
            This is its superpower. You can now build a chatbot for your
            company&apos;s internal wiki, a medical assistant that uses the
            latest research, or a legal tool that understands a specific set of
            case files.
          </li>

          <li>
            <strong className="text-red-400">Provides Citations:</strong> Since
            you know which chunks were retrieved, you can easily tell the user
            where the information came from (e.g., &quot;This answer was based
            on document &apos;HR-Policy-2025.pdf&apos;, page 4.&quot;). This
            builds trust and verifiability.
          </li>

          <li>
            <strong className="text-red-400">Cost-Effective:</strong>{" "}
            Fine-tuning or retraining an entire LLM on new data is incredibly
            expensive and time-consuming. RAG is a much cheaper and faster way
            to infuse new knowledge into your system.
          </li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Part 5: Building RAG Systems with LangChain
        </h2>

        <p className="mb-6">
          <a
            href="https://www.langchain.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 underline hover:text-red-500"
          >
            LangChain
          </a>{" "}
          is a popular framework that makes building RAG systems much easier. It
          provides pre-built components for each step of the RAG pipeline:
        </p>

        <ol className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong className="text-red-400">Document Loaders:</strong>{" "}
            LangChain has built-in loaders for PDFs, Word docs, HTML, Markdown,
            CSV, and many other file types.
          </li>

          <li>
            <strong className="text-red-400">Text Splitters:</strong> Various
            algorithms to split your documents into optimal chunks.
          </li>

          <li>
            <strong className="text-red-400">Embeddings:</strong> Easy
            integration with embedding models from OpenAI, Hugging Face, and
            others.
          </li>

          <li>
            <strong className="text-red-400">Vector Stores:</strong> Connect to
            popular vector databases like Pinecone, Chroma, FAISS, and more.
          </li>

          <li>
            <strong className="text-red-400">Retrieval:</strong> Simple
            interfaces for similarity search, including advanced techniques like
            MMR (Maximum Marginal Relevance) to increase result diversity.
          </li>

          <li>
            <strong className="text-red-400">Prompt Templates:</strong> Create,
            manage and reuse sophisticated prompts for different use cases.
          </li>

          <li>
            <strong className="text-red-400">Chain of Thought:</strong> Build
            complex reasoning systems that go beyond basic RAG.
          </li>
        </ol>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] border border-[#353945] mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Try Our RAG System
        </h2>
        <p className="mb-4">
          We&apos;ve built a working RAG system that demonstrates all the
          concepts covered in this article. You can upload your own PDF
          documents and ask questions about them.
        </p>
        <div className="flex justify-center">
          <Link
            href="/rag-system"
            className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all"
          >
            Try the RAG System →
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Part 6: Evaluation and Challenges
        </h2>

        <h3 className="text-xl font-semibold mb-3">
          How do we evaluate RAG systems?
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong className="text-red-400">Retrieval Quality:</strong> Are we
            retrieving the most relevant documents for a given query?
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Metrics: Precision, Recall, Mean Average Precision (MAP)</li>
            </ul>
          </li>

          <li>
            <strong className="text-red-400">Answer Quality:</strong> Is the
            final answer helpful, accurate and based on the retrieved documents?
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>
                Metrics: Faithfulness (does it stick to the retrieved context?),
                Relevance (does it answer the question?), Coherence (is it
                well-written?)
              </li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Common Challenges in RAG</h3>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong className="text-red-400">
              Choosing Optimal Chunk Sizes:
            </strong>{" "}
            Too small and you lose context; too large and retrieval becomes less
            precise.
          </li>

          <li>
            <strong className="text-red-400">
              Context Window Limitations:
            </strong>{" "}
            LLMs have a maximum input size (context window). You need to balance
            the number of retrieved chunks with this limitation.
          </li>

          <li>
            <strong className="text-red-400">
              Retrieval of Relevant Information:
            </strong>{" "}
            Sometimes semantically similar content isn&apos;t what the user
            needs.
          </li>

          <li>
            <strong className="text-red-400">
              Handling Contradictory Information:
            </strong>{" "}
            When retrieved chunks contain conflicting information, the LLM might
            struggle to provide a coherent answer.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Conclusion</h2>

        <p className="mb-4">
          RAG represents one of the most practical and immediate applications of
          LLMs in real-world scenarios. It addresses the fundamental limitations
          of traditional LLMs by connecting them to external, updatable
          knowledge sources, dramatically reducing hallucinations and enabling
          domain-specific applications.
        </p>

        <p className="mb-4">
          As the field evolves, we&apos;re seeing advanced RAG techniques
          emerge, such as:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong className="text-red-400">Hybrid Search:</strong> Combining
            keyword and semantic search for better retrieval
          </li>
          <li>
            <strong className="text-red-400">Reranking:</strong> Using a
            separate model to rerank retrieved documents for greater relevance
          </li>
          <li>
            <strong className="text-red-400">Multi-stage Retrieval:</strong>{" "}
            Using iterative approaches to refine search results
          </li>
          <li>
            <strong className="text-red-400">Self-RAG:</strong> Systems that can
            evaluate their own retrievals and regenerate when necessary
          </li>
        </ul>

        <p>
          With frameworks like LangChain making implementation easier than ever,
          RAG is becoming the foundation for a new generation of AI applications
          that combine the power of LLMs with the specificity and reliability of
          custom knowledge bases.
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-[#353945] pt-8 mt-12">
        <Link
          href="/what-are-vectors"
          className="flex items-center text-gray-400 hover:text-red-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          What are Vectors?
        </Link>
        <Link
          href="/what-is-vector-database-and-internal-implementation"
          className="flex items-center text-gray-400 hover:text-red-400 transition-colors"
        >
          Vector Database Implementation
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </PageLayout>
  );
}
