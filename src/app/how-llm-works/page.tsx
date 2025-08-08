import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import ImageModal from "@/components/ImageModal";
import SampleCode from "@/components/SampleCode";

export const metadata: Metadata = {
  title: "How LLMs Actually Work | Personal GenAI Notes",
  description:
    "Deep dive into the actual capabilities of Large Language Models, their limitations, and how they interact with external tools.",
  keywords:
    "LLM capabilities, LLM limitations, predictive text, token prediction, LLM context, LLM external tools",
  openGraph: {
    title: "How LLMs Actually Work | Personal GenAI Notes",
    description:
      "Understanding the true nature of Large Language Models: prediction, not calculation or reasoning.",
    type: "article",
  },
};

export default function HowLLMWorks() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] text-white p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        <Header />
        <div>
          {/* Main Content */}
          <div className="mb-12 text-center mt-8">
            <Link
              href="/"
              className="inline-block mb-8 text-red-400 hover:text-red-500 transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
                How LLMs Actually Work
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the core capabilities and limitations of Large
              Language Models
            </p>
          </div>

          {/* Introduction */}
          <div className="sm:bg-[#1c1f2a]/60 p-2 sm:p-8 rounded-xl sm:border sm:border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300 mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              The Truth About LLM Capabilities
            </h2>
            <p className="text-gray-300 mb-4">
              Large Language Models (LLMs) like ChatGPT, Claude, and Gemini are
              often perceived as intelligent systems that can calculate, reason,
              and access real-time information. However, the reality is quite
              different. These models don&apos;t actually perform calculations
              or access external data in their native form - they&apos;re
              fundamentally{" "}
              <span className="text-red-400 font-semibold">
                prediction engines
              </span>
              .
            </p>
            <p className="text-gray-300 mb-4">
              The core functionality of an LLM is to predict the next most
              likely token (word or part of a word) based on patterns learned
              from its training data. This predictive capability, while
              impressive, is fundamentally different from actual computation or
              reasoning.
            </p>
            <p className="text-gray-300">
              In this guide, we&apos;ll explore the true nature of LLMs, their
              limitations, and how they use external tools to overcome their
              inherent constraints.
            </p>
          </div>

          {/* Understanding LLM Predictions */}
          <div className="sm:bg-[#1c1f2a]/60 p-2 sm:p-8 rounded-xl sm:border sm:border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300 mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Prediction, Not Calculation
            </h2>
            <p className="text-gray-300 mb-4">
              When you ask an LLM a simple arithmetic question like &quot;What
              is 2 + 2?&quot; and it correctly responds with &quot;4,&quot; it
              might seem like the model is performing calculation. However,
              what&apos;s actually happening is pattern recognition and
              prediction.
            </p>

            <div className="bg-[#13151b] p-4 rounded-lg my-6">
              <div className="mb-4 border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-blue-400 font-medium">User</p>
                <p className="text-gray-300">What is 2 + 2?</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <p className="text-green-400 font-medium">LLM</p>
                <p className="text-gray-300">2 + 2 = 4</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
              The model has seen countless examples of &quot;2 + 2 = 4&quot; in
              its training data, so it predicts that after &quot;What is 2 +
              2?&quot; the most likely next tokens would form the answer
              &quot;4&quot;. This is fundamentally different from performing the
              mathematical operation of addition.
            </p>

            <p className="text-gray-300 mb-4">
              Think of it like this: the model is more like an extremely
              sophisticated autocomplete system that has seen a vast amount of
              text and can predict what usually comes after a given prompt,
              rather than a calculator that computes results.
            </p>

            <div className="mt-6 p-6 bg-[#13151b]/50 rounded-lg border border-[#353945]">
              <h3 className="text-lg font-semibold mb-2">Key Point</h3>
              <p className="text-gray-300">
                LLMs operate on the principle of prediction rather than
                calculation. They generate responses by predicting word
                sequences based on patterns in their training data, not by
                performing actual operations.
              </p>
            </div>
          </div>

          {/* Limitations of LLMs */}
          <div className="sm:bg-[#1c1f2a]/60 p-2 sm:p-8 rounded-xl sm:border sm:border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300 mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Inherent Limitations
            </h2>
            <p className="text-gray-300 mb-4">
              Due to their nature as prediction engines, LLMs have several
              inherent limitations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
                <h3 className="text-xl font-semibold mb-3 text-red-400">
                  No Real-Time Data
                </h3>
                <p className="text-gray-300">
                  LLMs cannot access current information like today&apos;s
                  weather, stock prices, or news headlines. Their knowledge is
                  limited to what was available in their training data, which
                  has a specific cutoff date.
                </p>
                <div className="mt-4 border-t border-[#353945] pt-4">
                  <p className="text-gray-400 italic">
                    Example: If asked &quot;What&apos;s the temperature in Delhi
                    right now?&quot; a pure LLM cannot provide an accurate
                    answer without external tools.
                  </p>
                </div>
              </div>

              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
                <h3 className="text-xl font-semibold mb-3 text-red-400">
                  No Actual Computation
                </h3>
                <p className="text-gray-300">
                  LLMs cannot perform calculations in the traditional sense.
                  They can predict answers to common math problems but struggle
                  with complex or unusual calculations that weren&apos;t
                  well-represented in their training data.
                </p>
                <div className="mt-4 border-t border-[#353945] pt-4">
                  <p className="text-gray-400 italic">
                    Example: While an LLM might get &quot;12 × 12&quot; right
                    based on pattern recognition, it might fail on &quot;19,387
                    × 6,421&quot; without external help.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
                <h3 className="text-xl font-semibold mb-3 text-red-400">
                  Cannot Execute Code
                </h3>
                <p className="text-gray-300">
                  While LLMs can generate code, they cannot execute it
                  themselves or observe its results. Any code-related
                  functionality requires external tools to run the code and
                  return results.
                </p>
                <div className="mt-4 border-t border-[#353945] pt-4">
                  <p className="text-gray-400 italic">
                    Example: An LLM can write a Python function to analyze data
                    but cannot run it or see its output without an external code
                    interpreter.
                  </p>
                </div>
              </div>

              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
                <h3 className="text-xl font-semibold mb-3 text-red-400">
                  Training Data Limitations
                </h3>
                <p className="text-gray-300">
                  LLMs are only as good as their training data. If the data
                  contains errors or biases, these will be reflected in the
                  model&apos;s predictions. This can lead to incorrect answers
                  for questions where the training data was flawed.
                </p>
                <div className="mt-4 border-t border-[#353945] pt-4">
                  <p className="text-gray-400 italic">
                    Example: An LLM might incorrectly state the number of
                    letters in a word if that word was consistently misspelled
                    in its training data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* External Tools and Integration */}
          <div className="sm:bg-[#1c1f2a]/60 p-2 sm:p-8 rounded-xl sm:border sm:border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300 mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Extending Capabilities with External Tools
            </h2>
            <p className="text-gray-300 mb-4">
              To overcome their inherent limitations, modern AI systems often
              integrate LLMs with external tools. These tools allow LLMs to
              perform tasks that would be impossible for a pure prediction
              model.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
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
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Code Interpreters
                </h3>
                <p className="text-gray-400">
                  Allow LLMs to write and execute code to perform calculations,
                  analyze data, or solve complex problems. The code runs in a
                  secure environment and returns results back to the model.
                </p>
              </div>

              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Web Search</h3>
                <p className="text-gray-400">
                  Connects LLMs to search engines, allowing them to retrieve
                  current information from the internet and incorporate it into
                  their responses.
                </p>
              </div>

              <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Specialized APIs</h3>
                <p className="text-gray-400">
                  Provide access to specific data sources or services, such as
                  weather forecasts, financial data, or translation services to
                  enhance the LLM&apos;s capabilities.
                </p>
              </div>
            </div>

            <div className="bg-[#13151b] p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-red-400">
                From Gemini: On Using External Tools
              </h3>
              <div className="pl-4 border-l-2 border-red-400">
                <p className="text-gray-300 italic mb-3">
                  For simple, straightforward arithmetic, I can often provide
                  the answer as a <span className="italic">pure</span> LLM by
                  drawing on the patterns I learned during training.
                </p>
                <p className="text-gray-300 italic mb-3">
                  For more complex or critical calculations, I am designed to
                  take external help by using a computational tool to ensure
                  accuracy. This is a key feature of my architecture that allows
                  me to reliably handle a wide range of mathematical tasks
                  without hallucinating or making errors that a pure language
                  model might.
                </p>
                <p className="text-gray-300 italic">
                  This hybrid approach allows me to combine the strengths of
                  both systems: the linguistic fluency and contextual
                  understanding of an LLM with the precision and reliability of
                  a dedicated computational engine.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-[#13151b]/50 rounded-lg border border-[#353945]">
              <h3 className="text-lg font-semibold mb-2">Key Insight</h3>
              <p className="text-gray-300">
                When interacting with modern AI assistants, you&apos;re often
                engaging with a hybrid system that combines an LLM&apos;s
                predictive capabilities with various specialized tools. This
                integration allows the AI to transcend the limitations of a pure
                LLM.
              </p>
            </div>
          </div>

          {/* Code and Context Example Section */}
          <div className="sm:bg-[#1c1f2a]/30 rounded-xl sm:border sm:border-[#353945] p-2  sm:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              The Importance of Context
            </h2>
            <p className="text-gray-300 mb-6">
              One critical limitation of LLMs is that they don&apos;t inherently
              maintain context or &quot;remember&quot; previous interactions.
              Any appearance of memory is actually engineered through how the
              conversation history is managed.
            </p>

            <div className="bg-[#13151b] p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Sample Chat API Implementation (Pure LLM)
              </h3>
              <SampleCode />
              <p className="mt-4 text-sm text-gray-400">
                When using an LLM directly through an API like this, you&apos;re
                accessing the pure prediction capabilities of the model without
                any additional tools or external data sources.
              </p>
            </div>

            <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] mb-8">
              <h3 className="text-xl font-semibold mb-4 text-red-400">
                Direct API vs Platform Interfaces
              </h3>
              <p className="text-gray-300 mb-4">
                There&apos;s an important distinction to understand when working
                with LLMs:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">
                    Pure LLM (SDK/API Usage)
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Direct interaction with the language model</li>
                    <li>Limited to prediction capabilities only</li>
                    <li>Cannot access current data or perform calculations</li>
                    <li>Context management must be handled manually</li>
                    <li>Used in the code example above</li>
                  </ul>
                </div>

                <div className="bg-[#13151b]/70 p-5 rounded-lg border border-[#353945]">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    Platform Interface (ChatGPT, Gemini Web)
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Enhanced with external tools and APIs</li>
                    <li>
                      Can access current information (weather, date, etc.)
                    </li>
                    <li>Can perform calculations via code interpreters</li>
                    <li>Automatic context management</li>
                    <li>Additional safety measures and monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#13151b]/50 p-5 rounded-lg border border-[#353945]">
                <h4 className="text-lg font-semibold mb-3">Example Evidence</h4>
                <p className="text-gray-300 mb-4">
                  The screenshots below demonstrate this difference. When asking
                  about the current date:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                  <li>
                    In our code example, a pure LLM can&apos;t tell you the
                    current date (it would guess based on training data)
                  </li>
                  <li>
                    In the Gemini web interface, the platform augments the LLM
                    with the current date information
                  </li>
                </ul>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0f1117] p-3 rounded-lg border border-[#353945]">
                    <h5 className="text-md font-medium mb-2 text-red-400">
                      Code Example: ai.service.ts
                    </h5>
                    <div className="overflow-hidden rounded-lg border border-[#353945]">
                      <ImageModal
                        src="/images/server-code-screenshot.png"
                        alt="Server-side code asking for date using Gemini API"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      This server-side code asks &quot;What is current date and
                      time?&quot; but the LLM does not have access to the actual
                      current date.
                    </p>
                  </div>
                  <div className="bg-[#0f1117] p-3 rounded-lg border border-[#353945]">
                    <h5 className="text-md font-medium mb-2 text-green-400">
                      Gemini Web Interface
                    </h5>
                    <div className="overflow-hidden rounded-lg border border-[#353945]">
                      <ImageModal
                        src="/images/gemini-web-screenshot.png"
                        alt="Gemini web interface showing current date response"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      The Gemini web interface correctly shows &quot;Wednesday,
                      August 6, 2025&quot; because it uses external tools to
                      access the current date.
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 mt-4 text-sm">
                  To make these screenshots work, save your code example and
                  Gemini screenshots as &quot;server-code-screenshot.png&quot;
                  and &quot;gemini-web-screenshot.png&quot; in the
                  /public/images folder. Click on any image to view it in
                  full-screen mode.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-400">
                  Without Context
                </h3>
                <div className="bg-[#13151b] p-4 rounded-lg mb-4">
                  <div className="mb-4 border-l-4 border-blue-500 pl-4 py-1">
                    <p className="text-blue-400 font-medium">User</p>
                    <p className="text-gray-300">
                      How many paws are in my house?
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <p className="text-green-400 font-medium">LLM</p>
                    <p className="text-gray-300">
                      I don&apos;t have information about your house or its
                      contents. To answer this question, I would need to know
                      how many pets or animals you have in your house, as
                      different animals have different numbers of paws.
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Without previous context about the dogs, the model cannot
                  answer the question accurately.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">
                  With Context
                </h3>
                <div className="bg-[#13151b] p-4 rounded-lg mb-4">
                  <div className="mb-4 border-l-4 border-blue-500 pl-4 py-1">
                    <p className="text-blue-400 font-medium">
                      User (First Message)
                    </p>
                    <p className="text-gray-300">I have 2 dogs in my house.</p>
                  </div>
                  <div className="mb-4 border-l-4 border-green-500 pl-4 py-1">
                    <p className="text-green-400 font-medium">LLM</p>
                    <p className="text-gray-300">
                      That&apos;s nice! Dogs make wonderful companions. Is there
                      anything specific about your dogs you&apos;d like to share
                      or discuss?
                    </p>
                  </div>
                  <div className="mb-4 border-l-4 border-blue-500 pl-4 py-1">
                    <p className="text-blue-400 font-medium">
                      User (Second Message)
                    </p>
                    <p className="text-gray-300">
                      How many paws are in my house?
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <p className="text-green-400 font-medium">LLM</p>
                    <p className="text-gray-300">
                      Since you mentioned having 2 dogs in your house, and each
                      dog has 4 paws, there would be a total of 8 dog paws in
                      your house (2 dogs × 4 paws each = 8 paws).
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  With the context that the user has 2 dogs, the model can now
                  provide an accurate answer.
                </p>
              </div>
            </div>

            <p className="text-gray-300">
              When building applications with LLMs, it&apos;s crucial to
              maintain conversation history. Chat platforms like ChatGPT do this
              automatically, but if you&apos;re building a custom application
              using an LLM API, you need to explicitly manage the context by
              sending previous messages along with new ones.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="sm:bg-[#1c1f2a]/30 rounded-xl sm:border sm:border-[#353945] p-2 sm:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Key Takeaways
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#13151b]/50 p-6 rounded-lg border border-[#353945]">
                <h3 className="text-xl font-semibold mb-3">What LLMs Can Do</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Predict text based on patterns in training data</li>
                  <li>Generate human-like responses to various prompts</li>
                  <li>Apply patterns recognized from training to new inputs</li>
                  <li>Maintain context when properly engineered</li>
                  <li>Generate creative content like stories or code</li>
                </ul>
              </div>

              <div className="bg-[#13151b]/50 p-6 rounded-lg border border-[#353945]">
                <h3 className="text-xl font-semibold mb-3">
                  What LLMs Cannot Do (Without External Tools)
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Access real-time or current information</li>
                  <li>Perform actual calculations (vs. predicting answers)</li>
                  <li>Execute code or interact with external systems</li>
                  <li>Access information beyond their training data</li>
                  <li>Inherently remember previous conversations</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#13151b]/70 rounded-lg border border-[#353945]">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Understanding the Hybrid Approach
              </h3>
              <p className="text-gray-300">
                Modern AI systems combine the predictive power of LLMs with
                specialized tools to create versatile, practical applications.
                This hybrid approach leverages the strengths of both systems:
                the linguistic fluency and contextual understanding of an LLM
                with the precision and capabilities of dedicated computational
                tools.
              </p>
              <p className="text-gray-300 mt-4">
                By understanding these fundamental limitations and capabilities,
                you can better interact with AI systems and build more effective
                applications that leverage LLMs appropriately.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
