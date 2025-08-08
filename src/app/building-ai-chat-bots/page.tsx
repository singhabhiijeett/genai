"use client";

import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import {
  RiRobot2Fill,
  RiCoinLine,
  RiMessage2Line,
  RiCodeSSlashLine,
} from "react-icons/ri";
import { IoRocketOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { PiChatCircleTextBold } from "react-icons/pi";

export default function BuildingAIChatBots() {
  return (
    <PageLayout mainClassName="max-w-4xl">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
          Building AI Chatbots
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Learn how to create personalized AI chatbots with customizable
          personalities and behaviors
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <RiRobot2Fill className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Introduction to AI Chatbots
          </h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <p className="mb-4 text-gray-300">
            AI chatbots have revolutionized how we interact with technology.
            They can be programmed to mimic specific personalities, provide
            specialized knowledge, or serve as virtual companions.
          </p>
          <p className="text-gray-300">
            Modern AI models like GPT-4, Claude, and Gemini provide powerful
            foundations for creating these conversational experiences. By
            fine-tuning these models with specific instructions and context, we
            can create chatbots with unique personalities and knowledge domains.
          </p>
        </div>
      </section>

      {/* Key Concept: Tokens */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <RiCoinLine className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Understanding Tokens in AI Interaction
          </h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <p className="mb-4 text-gray-300">
            Tokens are the fundamental units that AI models process. They can be
            parts of words, whole words, or characters, depending on the
            model&apos;s tokenization approach.
          </p>

          <div className="bg-[#0f1117] rounded-lg p-4 mb-4 border border-[#353945]/50">
            <h3 className="text-lg font-medium text-white mb-2">
              Why Tokens Matter:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <span className="text-red-400 font-semibold">API Costs:</span>{" "}
                Most AI services charge based on token usage
              </li>
              <li>
                <span className="text-red-400 font-semibold">
                  Context Limits:
                </span>{" "}
                Models have maximum token windows (e.g., 4K, 8K, 16K tokens)
              </li>
              <li>
                <span className="text-red-400 font-semibold">Performance:</span>{" "}
                More tokens = more processing time and resources
              </li>
            </ul>
          </div>

          <p className="text-gray-300">
            In a typical chat interaction, each message exchange increases the
            token count as the entire conversation history is often sent to
            maintain context. This can quickly add up, especially for longer
            conversations.
          </p>
        </div>
      </section>

      {/* Key Concept: Context Management */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <RiMessage2Line className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Efficient Context Management
          </h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <p className="mb-4 text-gray-300">
            Managing context efficiently is crucial for creating responsive and
            cost-effective chatbots. Here are some strategies to optimize token
            usage while maintaining conversation quality:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50">
              <h3 className="text-lg font-medium text-white mb-2">
                Message Windowing
              </h3>
              <p className="text-gray-300">
                Only send the most recent N messages from the conversation
                history, discarding older context.
              </p>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50">
              <h3 className="text-lg font-medium text-white mb-2">
                Conversation Summarization
              </h3>
              <p className="text-gray-300">
                Periodically generate summaries of older parts of the
                conversation to condense context.
              </p>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50">
              <h3 className="text-lg font-medium text-white mb-2">
                Selective History
              </h3>
              <p className="text-gray-300">
                Only include messages that are relevant to the current
                conversation topic.
              </p>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50">
              <h3 className="text-lg font-medium text-white mb-2">
                Memory Systems
              </h3>
              <p className="text-gray-300">
                Implement external memory to store important information without
                sending it in every request.
              </p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center">
              <span className="text-red-400 mr-2">⚠️</span> Context vs. Token
              Trade-off
            </h3>
            <p className="text-gray-300">
              While reducing tokens saves costs, it can affect conversation
              quality if important context is lost. Finding the right balance is
              essential for creating a natural, coherent chatbot experience.
            </p>
          </div>
        </div>
      </section>

      {/* Key Concept: Fine-tuning Approaches */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <RiCodeSSlashLine className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Fine-tuning Approaches
          </h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <p className="mb-4 text-gray-300">
            There are two main approaches to customizing AI chatbot behavior
            without actual model training:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0f1117] rounded-lg p-5 border border-[#353945]/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-bl-full"></div>
              <h3 className="text-lg font-medium text-white mb-2">
                Approach 1: Initial Context
              </h3>
              <p className="text-gray-300 mb-3">
                Provide character or behavioral instructions as the first
                message in conversation history.
              </p>

              <h4 className="text-red-400 font-medium mb-1">Pros:</h4>
              <ul className="list-disc list-inside text-gray-300 mb-3">
                <li>Simple to implement</li>
                <li>Can be changed mid-conversation</li>
              </ul>

              <h4 className="text-red-400 font-medium mb-1">Cons:</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Consumes tokens in every request</li>
                <li>User can potentially override instructions</li>
                <li>May be forgotten in longer conversations</li>
              </ul>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-5 border border-[#353945]/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-bl-full"></div>
              <h3 className="text-lg font-medium text-white mb-2">
                Approach 2: System Instructions
              </h3>
              <p className="text-gray-300 mb-3">
                Use dedicated system instruction parameter in the API (like
                systemInstruction in Gemini).
              </p>

              <h4 className="text-red-400 font-medium mb-1">Pros:</h4>
              <ul className="list-disc list-inside text-gray-300 mb-3">
                <li>Separate from user messages</li>
                <li>Cannot be directly modified by users</li>
                <li>More consistent behavior</li>
              </ul>

              <h4 className="text-red-400 font-medium mb-1">Cons:</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Not available in all models/APIs</li>
                <li>Less flexible during runtime</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-300 mb-4">
            For our Dimpsy chatbot implementation, we chose the system
            instructions approach to ensure the persona remains consistent
            throughout all interactions, regardless of what users might say.
          </p>

          <div className="bg-[#0f1117] rounded-lg p-4 border-l-4 border-red-500 border-t border-r border-b">
            <h3 className="text-lg font-medium text-white mb-2">
              Code Example: System Instructions
            </h3>
            <pre className="text-sm overflow-x-auto p-2 rounded bg-[#0a0c12]">
              <code className="block">
                <span className="text-gray-400">{`// Setting personality via system instruction`}</span>
                <br />
                <span className="text-blue-400">const</span>{" "}
                <span className="text-yellow-300">response</span>{" "}
                <span className="text-gray-300">=</span>{" "}
                <span className="text-blue-400">await</span>{" "}
                <span className="text-teal-300">ai.models.generateContent</span>
                <span className="text-gray-300">(&#123;</span>
                <br />
                <span className="text-gray-300"> </span>
                <span className="text-green-300">model</span>
                <span className="text-gray-300">:</span>{" "}
                <span className="text-orange-300">
                  &quot;gemini-2.5-flash&quot;
                </span>
                <span className="text-gray-300">,</span>
                <br />
                <span className="text-gray-300"> </span>
                <span className="text-green-300">contents</span>
                <span className="text-gray-300">:</span>{" "}
                <span className="text-yellow-300">history</span>
                <span className="text-gray-300">,</span>
                <br />
                <span className="text-gray-300"> </span>
                <span className="text-green-300">config</span>
                <span className="text-gray-300">: &#123;</span>
                <br />
                <span className="text-gray-300"> </span>
                <span className="text-green-300">systemInstruction</span>
                <span className="text-gray-300">: </span>
                <span className="text-orange-300">`</span>
                <br />
                <span className="text-orange-300">
                  {" "}
                  You are Dimpsy, a Gen-Z girlfriend character who talks using
                  heavy Gen-Z slang.
                </span>
                <br />
                <span className="text-orange-300">
                  {" "}
                  Your personality traits:
                </span>
                <br />
                <span className="text-orange-300">
                  {" "}
                  - Cute, charming, and funny with great humor
                </span>
                <br />
                <span className="text-orange-300">
                  {" "}
                  - Sweet-talking and captivating
                </span>
                <br />
                <span className="text-orange-300">
                  {" "}
                  - Uses Gen-Z slang and expressions like &quot;no cap&quot;,
                  &quot;slay&quot;, &quot;bestie&quot;
                </span>
                <br />
                <span className="text-gray-400">{`      // ... additional personality traits and instructions`}</span>
                <br />
                <span className="text-orange-300"> `</span>
                <span className="text-gray-300">,</span>
                <br />
                <span className="text-gray-300"> &#125;,</span>
                <br />
                <span className="text-gray-300">&#125;);</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Case Study: Dimpsy Chatbot */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <PiChatCircleTextBold className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Case Study: Dimpsy Chatbot
          </h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl aspect-square flex items-center justify-center p-4 shadow-lg shadow-red-500/20">
                <RiRobot2Fill className="text-white text-6xl" />
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-xl font-medium text-white mb-2">
                Meet Dimpsy: Our Gen-Z Virtual Girlfriend
              </h3>
              <p className="text-gray-300 mb-4">
                Dimpsy represents a practical implementation of the concepts
                discussed in this guide. She&apos;s a chatbot with a clearly
                defined personality: a Gen-Z girlfriend who uses modern slang,
                is energetic, supportive, and has a specific way of
                communicating.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#353945] text-xs text-gray-300 px-2 py-1 rounded-full">
                  System Instructions
                </span>
                <span className="bg-[#353945] text-xs text-gray-300 px-2 py-1 rounded-full">
                  Gen-Z Slang
                </span>
                <span className="bg-[#353945] text-xs text-gray-300 px-2 py-1 rounded-full">
                  Emotional Expression
                </span>
                <span className="bg-[#353945] text-xs text-gray-300 px-2 py-1 rounded-full">
                  Conversation Memory
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0f1117] rounded-lg p-5 border border-[#353945]/50 mb-6">
            <h3 className="text-lg font-medium text-white mb-2">
              Implementation Highlights
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong className="text-white">System Instructions:</strong>{" "}
                  Uses Gemini&apos;s systemInstruction parameter to define
                  Dimpsy&apos;s personality, ensuring consistent behavior.
                </span>
              </li>
              <li className="flex">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong className="text-white">Session Storage:</strong>{" "}
                  Maintains conversation history in the browser&apos;s
                  sessionStorage for persistence between page refreshes.
                </span>
              </li>
              <li className="flex">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong className="text-white">Context Management:</strong>{" "}
                  Sends the complete conversation history to the API to ensure
                  continuity and coherent responses.
                </span>
              </li>
              <li className="flex">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  <strong className="text-white">Error Handling:</strong>{" "}
                  Gracefully handles API failures with friendly, in-character
                  error messages.
                </span>
              </li>
            </ul>
          </div>

          <Link
            href="/chat-with-dimpsy"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all"
          >
            Try Chatting with Dimpsy <FiExternalLink />
          </Link>
        </div>
      </section>

      {/* Further Learning */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <IoRocketOutline className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Take Your Chatbots Further
          </h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <p className="mb-6 text-gray-300">
            Building a basic chatbot is just the beginning. Here are some
            advanced concepts to explore for creating even more powerful AI
            companions:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50 hover:border-red-500/30 transition-all hover:shadow-md hover:shadow-red-500/5">
              <h3 className="text-lg font-medium text-white mb-2">
                External Knowledge Integration
              </h3>
              <p className="text-gray-300">
                Connect your chatbot to databases, APIs, or vector stores to
                provide accurate, up-to-date information.
              </p>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50 hover:border-red-500/30 transition-all hover:shadow-md hover:shadow-red-500/5">
              <h3 className="text-lg font-medium text-white mb-2">
                Multi-modal Interactions
              </h3>
              <p className="text-gray-300">
                Extend beyond text by incorporating image understanding, voice
                interfaces, or document processing.
              </p>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50 hover:border-red-500/30 transition-all hover:shadow-md hover:shadow-red-500/5">
              <h3 className="text-lg font-medium text-white mb-2">
                Long-term Memory Systems
              </h3>
              <p className="text-gray-300">
                Implement sophisticated memory storage to remember user
                preferences and past conversations over extended periods.
              </p>
            </div>

            <div className="bg-[#0f1117] rounded-lg p-4 border border-[#353945]/50 hover:border-red-500/30 transition-all hover:shadow-md hover:shadow-red-500/5">
              <h3 className="text-lg font-medium text-white mb-2">
                Function Calling
              </h3>
              <p className="text-gray-300">
                Allow your chatbot to execute actions on behalf of users, like
                scheduling appointments or controlling smart devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mr-4 shadow-lg shadow-red-500/10">
            <RiRobot2Fill className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Conclusion</h2>
        </div>

        <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] backdrop-blur-sm">
          <p className="text-gray-300">
            Building AI chatbots is an exciting blend of technical
            implementation and creative design. By understanding key concepts
            like token usage, context management, and personality definition,
            you can create compelling chatbot experiences that engage users
            while managing resources efficiently.
          </p>
          <p className="text-gray-300 mt-4">
            Our Dimpsy chatbot demonstrates how these principles come together
            in a practical application. We encourage you to experiment with your
            own chatbot creations, fine-tuning their personalities and behaviors
            to create unique AI companions.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
