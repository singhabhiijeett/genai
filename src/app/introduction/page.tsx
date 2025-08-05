import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Generative AI Works | Personal GenAI Notes",
  description:
    "Learn how generative AI works using first principles thinking. Understand tokenization, prediction, and pattern recognition in large language models.",
  keywords:
    "generative AI, LLM, tokenization, GPT, ChatGPT, AI fundamentals, pattern recognition",
  openGraph: {
    title: "How Generative AI Works | Personal GenAI Notes",
    description:
      "Demystifying the magic behind ChatGPT and other generative AI systems using first principles thinking",
    type: "article",
  },
};

export default function Introduction() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-[#0f1117] via-[#181a20] to-[#1a1d23] text-white p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        <Header />
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
              How Generative AI Works
            </span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Demystifying the magic behind ChatGPT and other generative AI
            systems using first principles thinking
          </p>
        </div>

        {/* Main content */}
        <div className="bg-[#1c1f2a]/60 p-8 rounded-xl border border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300 mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            The Impossible Question
          </h2>
          <p className="text-gray-300 mb-4">
            If I ask you a question you&apos;ve never seen before, would you be
            able to answer it? Most people initially think, &quot;No,
            that&apos;s impossible!&quot; But that&apos;s not quite true. You
            actually can answer new questions by recognizing patterns and
            applying your understanding from similar situations.
          </p>
          <p className="text-gray-300 mb-4">
            For example, if you know how addition works and I give you two
            numbers you&apos;ve never added before, you can still solve it by
            applying the pattern of addition. You don&apos;t need to have
            memorized every possible arithmetic problem to solve a new one.
          </p>
          <p className="text-gray-300">
            This is precisely how AI systems like ChatGPT work! They&apos;re not
            just retrieving memorized answers—they&apos;re recognizing patterns
            in language and generating responses based on those patterns, even
            to questions they&apos;ve never encountered. In this guide,
            we&apos;ll explore this fascinating capability using first
            principles and easy-to-understand examples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-[#1c1f2a]/60 p-8 rounded-xl border border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4">
              First Principles Thinking
            </h2>
            <p className="text-gray-300 mb-4">
              To understand ChatGPT, we need to break down our assumptions about
              how AI works. Consider this sequence: 2, 4, 6, 8... Even if
              you&apos;ve never seen this exact sequence before, you can predict
              that the next number is 10.
            </p>
            <p className="text-gray-300">
              You recognized a pattern (adding 2) and applied it to predict what
              comes next. This is essentially how ChatGPT works - it identifies
              patterns in language and uses them to predict what text should
              come next.
            </p>
          </div>

          <div className="bg-[#1c1f2a]/60 p-8 rounded-xl border border-[#353945] backdrop-blur-sm hover:shadow-red-500/5 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4">Predictive Power</h2>
            <p className="text-gray-300 mb-4">
              When you ask ChatGPT a question like &quot;Hello, how are
              you?&quot;, it doesn&apos;t retrieve a pre-written answer.
              Instead, it predicts what text should follow your input, one token
              (piece of text) at a time.
            </p>
            <p className="text-gray-300">
              It recognizes that your greeting typically elicits responses like
              &quot;I&apos;m doing well, thank you for asking!&quot; based on
              patterns it learned during training - not because it was
              programmed with specific answers to specific questions.
            </p>
          </div>
        </div>

        {/* Mechanism of ChatGPT */}
        <div className="bg-[#1c1f2a]/30 rounded-xl border border-[#353945] p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            How ChatGPT Really Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tokenization</h3>
                <p className="text-gray-300">
                  When you input text, ChatGPT first breaks it down into tokens
                  (words or parts of words). For example, &quot;Hello, how are
                  you?&quot; might become [&quot;Hello&quot;, &quot;,&quot;,
                  &quot;how&quot;, &quot;are&quot;, &quot;you&quot;,
                  &quot;?&quot;].
                </p>
                <div className="bg-[#13151b] p-4 rounded-lg font-mono text-sm my-4 overflow-x-auto">
                  <p className="text-green-400">{`/* Text broken into tokens */`}</p>
                  <p className="text-gray-300">
                    Text:{" "}
                    <span className="text-purple-400">
                      &quot;hello how are you&quot;
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Tokens:{" "}
                    <span className="text-purple-400">
                      [&quot;hello&quot;, &quot;how&quot;, &quot;are&quot;,
                      &quot;you&quot;]
                    </span>
                  </p>
                  <p className="text-gray-300 mt-2">{`/* These tokens are converted to numeric IDs */`}</p>
                  <p className="text-gray-300">
                    Token IDs:{" "}
                    <span className="text-yellow-300">
                      [24912, 1495, 553, 481, 220]
                    </span>
                  </p>
                </div>
                <p className="text-gray-300 mt-3">
                  Each model has its own unique tokenization method. GPT-3,
                  GPT-3.5, and GPT-4 all use different tokenizers that split
                  text in slightly different ways. This is why the same text
                  might be broken into a different number of tokens depending on
                  which model you&apos;re using.
                </p>
                <p className="text-gray-300 mt-3">
                  A helpful rule of thumb is that one token generally
                  corresponds to ~4 characters of English text, or roughly ¾ of
                  a word (about 100 tokens = 75 words).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Prediction</h3>
                <p className="text-gray-300">
                  The AI looks at your input tokens and predicts what should
                  come next. For each position, it calculates probabilities for
                  all possible next tokens. For example, after &quot;Hello, how
                  are&quot;, the word &quot;you&quot; has a high probability of
                  being next.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Generation</h3>
                <p className="text-gray-300">
                  The model selects tokens based on these probabilities, adds
                  them to the response, and then uses all text so far to predict
                  the next token. This process repeats until a complete response
                  is generated - creating new text that wasn&apos;t in its
                  training data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tokenization Example Section */}
        <div className="bg-[#1c1f2a]/30 rounded-xl border border-[#353945] p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Different Models, Different Tokenizers
          </h2>
          <p className="text-gray-300 mb-6">
            Different AI models use different tokenization methods. Below is an
            example of how the same text could be tokenized differently
            depending on the model:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#13151b] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-red-400 mb-2">GPT-4</h3>
              <div className="font-mono text-sm">
                <p className="text-gray-400">
                  Input text: &quot;hello how are you&quot;
                </p>
                <p className="mt-2 text-gray-300">
                  Tokens: <span className="text-purple-400">5</span>
                </p>
                <p className="text-gray-300">
                  Characters: <span className="text-purple-400">18</span>
                </p>
                <p className="mt-2 text-yellow-300">
                  [24912, 1495, 553, 481, 220]
                </p>
                <div className="mt-3 flex">
                  <span className="bg-purple-800/30 px-1 border border-purple-700">
                    hello
                  </span>
                  <span className="bg-green-800/30 px-1 border border-green-700">
                    how
                  </span>
                  <span className="bg-blue-800/30 px-1 border border-blue-700">
                    are
                  </span>
                  <span className="bg-yellow-800/30 px-1 border border-yellow-700">
                    you
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#13151b] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-red-400 mb-2">
                GPT-3 (Legacy)
              </h3>
              <div className="font-mono text-sm">
                <p className="text-gray-400">
                  Input text: &quot;hello how are you&quot;
                </p>
                <p className="mt-2 text-gray-300">
                  Tokens: <span className="text-purple-400">4</span>
                </p>
                <p className="text-gray-300">
                  Characters: <span className="text-purple-400">18</span>
                </p>
                <p className="mt-2 text-yellow-300">[31373, 2200, 389, 345]</p>
                <div className="mt-3 flex">
                  <span className="bg-purple-800/30 px-1 border border-purple-700">
                    hello
                  </span>
                  <span className="bg-green-800/30 px-1 border border-green-700">
                    how
                  </span>
                  <span className="bg-blue-800/30 px-1 border border-blue-700">
                    are
                  </span>
                  <span className="bg-yellow-800/30 px-1 border border-yellow-700">
                    you
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mt-4">
            Notice how the same text produces different token counts and
            completely different token IDs depending on the model. This is
            important to understand when working with these systems, as it
            affects things like context length limits and processing costs.
          </p>
        </div>

        {/* Key Components Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Key Components of Generative AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Large Language Models",
                description:
                  "Massive neural networks trained on diverse text datasets that can recognize and generate complex patterns in language.",
              },
              {
                title: "Transformer Architecture",
                description:
                  "The breakthrough model design that enables AI to process and understand context in text through a mechanism called 'attention'.",
              },
              {
                title: "Pattern Recognition",
                description:
                  "The ability to identify structure in data, allowing the AI to make predictions even for inputs it has never seen before.",
              },
              {
                title: "Next-Token Prediction",
                description:
                  "The fundamental task of predicting what word or character comes next in a sequence based on previous context.",
              },
              {
                title: "Context Understanding",
                description:
                  "How the model uses surrounding words to understand the meaning of text and generate appropriate responses.",
              },
              {
                title: "Generative Capability",
                description:
                  "The ability to create new content rather than simply retrieving or classifying existing information.",
              },
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white font-semibold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-400">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Example Section */}
        <div className="bg-[#1c1f2a]/30 rounded-xl border border-[#353945] p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Practical Example: The Code Fixer
          </h2>
          <div className="space-y-6">
            <p className="text-gray-300 mb-4">
              One impressive capability of generative AI is fixing code errors
              without having seen that specific code before. Here&apos;s how it
              works:
            </p>

            <div className="bg-[#13151b] p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
              <p className="text-sky-400">{`/* Broken JavaScript code */`}</p>
              <p>
                <span className="text-purple-400">function</span>{" "}
                <span className="text-yellow-300">calculateSum</span>
                <span className="text-gray-300">(a, b) &#123;</span>
              </p>
              <p className="pl-4">
                <span className="text-purple-400">return</span>{" "}
                <span className="text-gray-300">a + b</span>
              </p>
              <p className="text-gray-300">&#125;</p>
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">result</span>{" "}
                <span className="text-gray-300">=</span>{" "}
                <span className="text-red-400">calculatesum</span>
                <span className="text-gray-300">(5, 10);</span>
              </p>
              <p>
                <span className="text-yellow-300">console</span>
                <span className="text-gray-300">.</span>
                <span className="text-green-400">log</span>
                <span className="text-gray-300">(result);</span>
              </p>
            </div>

            <p className="text-gray-300 mb-4">
              When shown this code, ChatGPT can identify that{" "}
              <code className="bg-[#13151b] px-1 rounded text-red-400">
                calculatesum
              </code>{" "}
              should be
              <code className="bg-[#13151b] px-1 rounded text-green-400">
                {" "}
                calculateSum
              </code>{" "}
              (case-sensitive) and that the function is missing a semicolon. It
              knows this despite never seeing this specific code before.
            </p>

            <p className="text-gray-300">
              This works because the AI has learned patterns from millions of
              code examples - variable naming conventions, syntax rules, and
              common mistakes. It uses these patterns to recognize errors and
              predict the correct code, just like it predicts the next token in
              a conversation.
            </p>
          </div>

          <div className="mt-10 p-6 bg-[#13151b]/50 rounded-lg border border-[#353945]">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Key Takeaways
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                Generative AI doesn&apos;t memorize answers - it predicts what
                should come next based on patterns
              </li>
              <li>
                It can handle questions it&apos;s never seen before by
                recognizing familiar patterns
              </li>
              <li>
                The same predictive capability works across text, code, images,
                and other formats
              </li>
              <li>
                Understanding these fundamentals helps us better utilize and
                interact with AI tools
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="text-center">
          <p className="text-xl text-gray-300 mb-6">
            Ready to dive deeper into how generative AI works?
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/foundations"
              className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              AI Foundations
            </Link>
            <Link
              href="/transformers"
              className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#1c1f2a]/80"
            >
              Explore Transformers
            </Link>
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
}
