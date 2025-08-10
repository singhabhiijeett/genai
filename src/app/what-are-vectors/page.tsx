import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Recommendations Lead to Vectors | Step-by-Step Guide",
  description:
    "From hand-made lists to graphs, to number lines, to multi-number coordinates. A gentle, no-jargon path to understanding vectors and the databases that store them.",
  openGraph: {
    title: "How Recommendations Lead to Vectors | Step-by-Step Guide",
    description:
      "Learn recommendations like Amazon/Netflix from first principles: arrays → graphs → number line → many-number coordinates (vectors) → fast search.",
    type: "article",
  },
};

export default function WhatAreVectors() {
  return (
    <PageLayout mainClassName="max-w-5xl">
      {/* Title */}
      <div className="mb-10 text-center mt-8">
        <Link
          href="/"
          className="inline-block mb-6 text-red-400 hover:text-red-500 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
            How Recommendation Systems Work (No Jargon)
          </span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-5" />
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          The same idea powers Amazon, Netflix, and YouTube. Let&apos;s build it
          up slowly—from simple hand-made lists to a clean mental model that
          scales.
        </p>
      </div>

      {/* 0. The Question */}
      <div className="bg-[#1c1f2a]/60 p-6 rounded-xl border border-[#353945] mb-10">
        <h2 className="text-2xl font-semibold mb-2">The Question</h2>
        <p className="text-gray-300 mb-3">
          Have you ever wondered how websites like Amazon know exactly what
          products to recommend when you shop? Or how Netflix seems to suggest
          movies you end up enjoying?
        </p>
        <p className="text-gray-300 mb-3">
          The core question these companies solve every day is:{" "}
          <span className="text-white font-medium">
            How do we show each person things they&apos;ll probably like?
          </span>{" "}
          Whether it&apos;s products on Amazon, videos on YouTube, or movies on
          Netflix.
        </p>
        <p className="text-gray-300">
          This guide will walk through exactly how modern recommendation systems
          work, starting from the simplest approach and building step by step to
          the powerful vector-based systems used today.
        </p>
      </div>

      {/* 1. Attempt: Hand-made Lists (Arrays) */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#0f1117] p-5 rounded-xl border border-[#353945]">
          <h3 className="text-xl font-semibold mb-2">
            Attempt 1: Hand‑Made Lists
          </h3>
          <p className="text-gray-300 mb-3">
            First idea: for each item, keep a small list of related items.
          </p>
          <CodeBlock
            language="ts"
            code={`const related: Record<string, string[]> = {
  banana: ["milk", "bread", "eggs"],
  protein: ["shaker", "creatine"],
  // ... and so on, by hand
};

// Show related["banana"] when user views a banana`}
          />
        </div>
        <div className="bg-[#0f1117] p-5 rounded-xl border border-[#353945]">
          <h3 className="text-xl font-semibold mb-2">Why this breaks</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>Too many items to maintain by hand.</li>
            <li>New items have empty lists.</li>
            <li>Misses surprising combos users discover over time.</li>
          </ul>
        </div>
      </div>

      {/* Walkthrough for Attempt 1 */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h4 className="text-lg font-semibold mb-2">
          Walkthrough: Our Tiny Store
        </h4>
        <p className="text-gray-300 mb-3">
          Imagine we launch a 6‑item store. We try to maintain related lists by
          hand. Then we add a new item and realize how fragile this gets.
        </p>
        <CodeBlock
          language="ts"
          code={`items = [banana, milk, bread, eggs, protein, shaker]
related = {
  banana: [milk, bread, eggs],
  protein: [shaker],
}
// Add "almond butter" → nothing recommends it; it recommends nothing
// You'd have to edit many lists by hand.`}
        />
      </div>

      {/* 2. Attempt: Let data connect items (Graph) */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Attempt 2: Let Data Draw the Map
        </h3>
        <p className="text-gray-300 mb-3">
          Let&apos;s improve our approach. Instead of manually creating lists,
          we can track what customers actually buy together and let the data
          guide us.
        </p>
        <p className="text-gray-300 mb-3">
          Every time two products are purchased together, we strengthen the
          connection between them. The more often they&apos;re bought together,
          the stronger their link becomes.
        </p>
        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 text-sm text-gray-300 space-y-4 mb-4">
          <p className="font-medium">Real-world example: Beer and Diapers</p>
          <p>
            A famous retail discovery found that on Friday nights, men would
            often buy beer and diapers together. This unexpected connection
            wasn&apos;t obvious until the data revealed it. The theory was that
            fathers, asked to pick up diapers on their way home, would also grab
            beer for the weekend.
          </p>
          <p>
            This type of insight is almost impossible to discover with manual
            lists, but a data-driven approach catches it automatically.
          </p>
        </div>
        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 text-sm text-gray-300 space-y-2">
          <p className="font-medium">How it works: Connection Strength</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-2 py-0.5 rounded bg-[#1c1f2a]">Banana</span>
            <span className="text-gray-500">— 42 →</span>
            <span className="px-2 py-0.5 rounded bg-[#1c1f2a]">Milk</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-2 py-0.5 rounded bg-[#1c1f2a]">Beer</span>
            <span className="text-gray-500">— 7 →</span>
            <span className="px-2 py-0.5 rounded bg-[#1c1f2a]">Diapers</span>
          </div>
          <p className="mt-2">
            The numbers represent how many times these items were bought
            together. To recommend products, we simply look for the strongest
            connections to what a customer is currently viewing.
          </p>
        </div>
        <p className="text-gray-400 mt-3">
          This approach works well and learns automatically from customer
          behavior. But it has problems at scale:
        </p>

        {/* Mini matrix view */}
        <div className="mt-4 bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium mb-2">Problems with Graph Approach</h4>
          <div className="space-y-3">
            <div>
              <p className="text-white">1. Storage Problem:</p>
              <p className="text-gray-300">
                For N products, we need an N×N matrix to track all
                relationships. With millions of products, this becomes massive.
              </p>
            </div>
            <div>
              <p className="text-white">2. Cold Start Problem:</p>
              <p className="text-gray-300">
                New products have no purchase history, so they have no
                connections and won&apos;t be recommended.
              </p>
            </div>
            <div>
              <p className="text-white">3. Computational Problem:</p>
              <p className="text-gray-300">
                Finding the top-5 strongest connections means sorting thousands
                or millions of values for each product view.
              </p>
            </div>
          </div>
          <CodeBlock
            language="ts"
            code={`// Adjacency matrix example (co-purchase counts)
// rows/cols: [banana, milk, bread, beer]
[
  [0, 42, 31,  1],  // banana was bought with milk 42 times
  [42, 0,  15,  0],  // milk was bought with bread 15 times
  [31, 15, 0,   0],  // etc.
  [1,  0,  0,   0]
]
// New item "chia" → new row & column full of 0s (cold start)
// With millions of products, this matrix is gigantic`}
          />
        </div>
      </div>

      {/* 3. Attempt: Put items on a number line */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Attempt 3: Organizing Items on a Number Line
        </h3>
        <p className="text-gray-300 mb-3">
          Let&apos;s try a different approach. What if we assign each product a
          single number based on some important feature? Then we could place all
          products on a simple number line.
        </p>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 text-sm text-gray-300 mb-4">
          <p className="font-medium mb-2">How it works:</p>
          <p className="mb-3">
            1. Assign each product a number (maybe based on how sweet,
            expensive, or popular it is)
          </p>
          <p className="mb-3">
            2. When a customer views a product, find other products with similar
            numbers
          </p>

          <div className="flex justify-center my-4">
            <div className="p-4 rounded-lg border border-[#353945]/60 bg-[#0f1117] text-gray-300 text-sm">
              <p className="mb-2 text-center font-medium">
                Number Line Example:
              </p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span>10</span>
                <span>—</span>
                <span>11</span>
                <span>—</span>
                <span className="text-gray-400">(milk=12)</span>
                <span>—</span>
                <span className="text-white font-medium">(banana=13)</span>
                <span>—</span>
                <span className="text-gray-400">(bread=14)</span>
                <span>—</span>
                <span>15</span>
              </div>
              <p className="text-center text-sm text-gray-400">
                When viewing banana (13), recommend milk (12) and bread (14) as
                they&apos;re nearby
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium mb-3">
            Problems with the Number Line Approach:
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-white">1. The Insertion Problem</p>
              <p className="text-gray-300">
                What happens when a new product arrives? Where do you put it? If
                you have:
              </p>
              <div className="p-3 my-2 bg-[#0f1117] rounded-lg text-sm">
                <p>… 12 (milk) — 13 (banana) — 14 (bread) …</p>
                <p className="text-gray-400">
                  And need to add cereal that&apos;s similar to both milk and
                  banana?
                </p>
                <p>… 12 (milk) — 12.5 (cereal) — 13 (banana) — 14 (bread) …</p>
                <p className="text-gray-400">
                  But this would require reshuffling all other items!
                </p>
              </div>
            </div>

            <div>
              <p className="text-white">2. The Edge Problem</p>
              <p className="text-gray-300">
                Products at the ends of the line only have neighbors on one
                side, limiting recommendation options.
              </p>
            </div>

            <div>
              <p className="text-white">3. The Complexity Problem</p>
              <p className="text-gray-300">
                Products have multiple attributes. A banana might be sweet
                (8/10), cheap (3/10), and healthy (7/10). How do you express all
                these attributes with just one number?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Netflix: a movie can be many things at once */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          The Multi-Dimensional Solution: Movies Have Multiple Traits
        </h3>
        <p className="text-gray-300 mb-4">
          We&apos;ve tried organizing items with one number, but it&apos;s not
          enough. Let&apos;s think about Netflix movies as a real-world example:
        </p>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 text-sm text-gray-300 space-y-3 mb-4">
          <p>Think about how you describe movies to friends. You might say:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              &quot;It&apos;s{" "}
              <span className="font-medium">mostly a comedy</span>, but has{" "}
              <span className="font-medium">some romance</span> too&quot;
            </li>
            <li>
              &quot;It&apos;s{" "}
              <span className="font-medium">super action-packed</span> with{" "}
              <span className="font-medium">a bit of humor</span>&quot;
            </li>
            <li>
              &quot;It&apos;s <span className="font-medium">very dramatic</span>{" "}
              and <span className="font-medium">quite realistic</span>&quot;
            </li>
          </ul>
          <p>
            Movies have different amounts of different traits, all at the same
            time.
          </p>
        </div>

        <p className="text-gray-300 mb-4">
          What if instead of one number, we give each movie{" "}
          <span className="font-medium">several numbers</span> - one for each
          important trait?
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
            <h4 className="font-medium mb-2">Example: Calm Romantic Comedy</h4>
            <div className="mb-2">
              <p className="text-sm text-gray-400 mb-1">
                Each trait scored from 0 (none) to 1 (maximum):
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-purple-900/30 border border-purple-800">
                Funny: 0.8
              </span>
              <span className="px-2 py-1 rounded bg-pink-900/30 border border-pink-800">
                Romance: 0.7
              </span>
              <span className="px-2 py-1 rounded bg-blue-900/30 border border-blue-800">
                Realistic: 0.6
              </span>
              <span className="px-2 py-1 rounded bg-yellow-900/30 border border-yellow-800">
                Drama: 0.3
              </span>
              <span className="px-2 py-1 rounded bg-red-900/30 border border-red-800">
                Action: 0.1
              </span>
            </div>
          </div>
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
            <h4 className="font-medium mb-2">Example: Action Comedy</h4>
            <div className="mb-2">
              <p className="text-sm text-gray-400 mb-1">
                Different blend of the same traits:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-red-900/30 border border-red-800">
                Action: 0.9
              </span>
              <span className="px-2 py-1 rounded bg-purple-900/30 border border-purple-800">
                Funny: 0.6
              </span>
              <span className="px-2 py-1 rounded bg-yellow-900/30 border border-yellow-800">
                Drama: 0.4
              </span>
              <span className="px-2 py-1 rounded bg-blue-900/30 border border-blue-800">
                Realistic: 0.2
              </span>
              <span className="px-2 py-1 rounded bg-pink-900/30 border border-pink-800">
                Romance: 0.1
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium mb-2">The Big Idea:</h4>
          <p className="text-gray-300">
            Instead of giving each item one number and placing it on a line, we
            give it <span className="font-medium">multiple numbers</span> (one
            for each trait) and place it in a{" "}
            <span className="font-medium">multi-dimensional space</span>.
          </p>
          <p className="text-gray-300 mt-2">This means:</p>
          <ul className="list-disc pl-5 text-gray-300 mt-2">
            <li>
              Each movie has its own unique &quot;fingerprint&quot; of traits
            </li>
            <li>We can find movies with similar fingerprints</li>
            <li>
              We can place new movies anywhere in this space without disrupting
              others
            </li>
            <li>We can capture the full complexity of each item</li>
          </ul>
        </div>
      </div>

      {/* 5. Give items coordinates (the simple idea) */}
      <div className="bg-[#1c1f2a]/30 rounded-xl border border-[#353945] p-6 mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Mapping Items in Multi-Dimensional Space
        </h3>
        <p className="text-gray-300 mb-3">
          Let&apos;s visualize how this works with a simple example. Imagine we
          track just two traits for simplicity: Action (0-1) and Funny (0-1).
          Each movie becomes a point on a 2D map.
        </p>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-2 text-white">
            How It Works: The Coordinate System
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-300">
                Each movie gets coordinates based on its traits:
              </p>
              <div className="p-3 bg-[#0f1117] rounded-lg">
                <p className="mb-1 text-white">Rom-Com Movie:</p>
                <p className="text-gray-300">[Action: 0.1, Funny: 0.8]</p>
                <p className="text-gray-400 text-sm">Low action, very funny</p>
              </div>

              <div className="p-3 bg-[#0f1117] rounded-lg">
                <p className="mb-1 text-white">Action Comedy:</p>
                <p className="text-gray-300">[Action: 0.9, Funny: 0.6]</p>
                <p className="text-gray-400 text-sm">
                  High action, moderately funny
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-4 bg-[#0f1117] rounded-lg text-center">
                <p className="mb-3 text-gray-300">The Fundamental Idea:</p>
                <p className="text-white font-medium mb-1">
                  Similar movies = Close points
                </p>
                <p className="text-white font-medium">
                  Different movies = Far points
                </p>
                <p className="mt-3 text-gray-400 text-sm">
                  This works with any number of dimensions!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 text-gray-300">
          <h4 className="font-medium mb-3 text-white">
            Finding Recommendations: Similarity Search
          </h4>

          <div className="space-y-4">
            <p>
              When a user watches and enjoys a movie with certain traits, we can
              find other movies with similar trait patterns:
            </p>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <p className="mb-2">
                <span className="font-medium">Example:</span> A user watches and
                likes several movies averaging around:
              </p>
              <p className="text-white">[Action: 0.2, Funny: 0.7]</p>
              <p className="mt-2">
                Our recommendation system looks for other movies with similar
                coordinates - low action, high humor - perhaps a light-hearted
                comedy.
              </p>
            </div>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <p className="font-medium mb-1">
                Simple Explanation of Similarity Search:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Take the traits of movies the user likes</li>
                <li>Look around that area on our trait map</li>
                <li>Recommend the closest movies they haven&apos;t seen yet</li>
              </ol>
              <p className="mt-2 text-gray-400 text-sm">
                That&apos;s all &quot;similarity search&quot; means!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.5 Putting it together for Netflix */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          How Netflix Actually Uses This Approach
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <p className="text-gray-300">
            When you use Netflix, this multi-dimensional approach powers your
            recommendations behind the scenes:
          </p>

          <ol className="list-decimal pl-5 text-gray-300 space-y-3 mt-3">
            <li>
              <span className="font-medium text-white">Trait Analysis:</span>{" "}
              Netflix analyzes each movie/show across dozens or hundreds of
              traits (not just the few we&apos;ve discussed)
            </li>
            <li>
              <span className="font-medium text-white">
                Learning Your Preferences:
              </span>{" "}
              As you watch content, Netflix builds a profile of trait
              combinations you enjoy
            </li>
            <li>
              <span className="font-medium text-white">
                Finding Similar Content:
              </span>{" "}
              The system searches its library for unwatched content with similar
              trait patterns
            </li>
            <li>
              <span className="font-medium text-white">
                Continuous Adaptation:
              </span>{" "}
              Your recommendations adjust as you keep watching and rating
              content
            </li>
          </ol>

          <div className="mt-4 p-3 bg-[#0f1117] rounded-lg">
            <h4 className="font-medium mb-2 text-white">
              Solving the Cold Start Problem
            </h4>
            <p className="text-gray-300">
              One huge advantage of this approach: when Netflix adds a brand new
              show or movie, they don&apos;t need to wait for people to watch it
              before they can recommend it.
            </p>
            <p className="text-gray-300 mt-2">
              They can analyze the content, assign trait values, and immediately
              place it in their multi-dimensional space. If it lands near other
              content you like, it may appear in your recommendations on day
              one!
            </p>
          </div>
        </div>
      </div>

      {/* 6. What this is called (light naming, optional) */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Introducing Vectors and Embeddings
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <p className="text-gray-300 mb-3">
            Now that you understand the concept, let&apos;s introduce the proper
            terminology that engineers and data scientists use:
          </p>

          <div className="space-y-4">
            <div className="p-3 bg-[#0f1117] rounded-lg">
              <h4 className="font-medium text-white mb-2">Vector</h4>
              <p className="text-gray-300">
                A list of numbers like [0.1, 0.8, 0.7, 0.6, 0.3] is called a{" "}
                <span className="text-white font-medium">vector</span>.
              </p>
              <p className="text-gray-300 mt-2">
                Each number in the vector represents a different dimension or
                trait. A vector with 5 numbers is called a 5-dimensional vector.
              </p>
              <div className="mt-2 p-2 border border-[#353945]/40 rounded-lg">
                <p className="text-sm text-gray-400">
                  If you remember coordinate pairs (x,y) from math class, those
                  are just 2-dimensional vectors!
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <h4 className="font-medium text-white mb-2">Embedding</h4>
              <p className="text-gray-300">
                When AI or machine learning creates these vectors automatically
                by analyzing data, we call the result an{" "}
                <span className="text-white font-medium">embedding</span>.
              </p>
              <p className="text-gray-300 mt-2">
                Instead of manually assigning trait values, the system learns
                them from patterns in the data.
              </p>
            </div>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <h4 className="font-medium text-white mb-2">Cosine Similarity</h4>
              <p className="text-gray-300">
                When comparing vectors, we often care more about their direction
                than their exact position. The technical name for this
                comparison is{" "}
                <span className="text-white font-medium">
                  cosine similarity
                </span>
                .
              </p>

              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 mb-2">Why direction matters:</p>
                  <p className="text-gray-300">
                    Consider two comedy-romance movies, one with stronger traits
                    than the other:
                  </p>
                  <p className="mt-1">
                    Movie A: [Funny: 0.5, Romance: 0.4]
                    <br />
                    Movie B: [Funny: 0.9, Romance: 0.7]
                  </p>
                  <p className="text-gray-400 mt-1">
                    Both have similar trait proportions (direction), so
                    they&apos;re similar despite different intensities.
                  </p>
                </div>

                <div>
                  <CodeBlock
                    language="ts"
                    code={`// Simple vector comparison
const A = [2, 2]; // direction is 45°
const B = [4, 4]; // same direction, 2x magnitude
const C = [4, 1]; // different direction

// A and B point the same way (similar movies)
// A and C point differently (different movies)`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Vector databases */}
      <div className="bg-[#1c1f2a]/30 rounded-xl border border-[#353945] p-6 mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Vector Databases: Storing and Searching Efficiently
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <p className="text-gray-300 mb-3">
            There&apos;s one more problem to solve: how do we store millions of
            vectors and search through them quickly?
          </p>

          <div className="p-3 bg-[#0f1117] rounded-lg mb-4">
            <h4 className="font-medium text-white mb-2">The Scale Problem</h4>
            <p className="text-gray-300">
              Imagine Netflix with 10,000+ movies and shows. Each item has a
              vector with 100+ dimensions. When a user wants recommendations, we
              need to find the closest vectors quickly.
            </p>
            <p className="text-gray-300 mt-2">
              The naive approach would be to compare the user&apos;s preference
              vector with every single item vector, but that would be too slow
              for real-time recommendations.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <h4 className="font-medium text-white mb-2">
              Enter Vector Databases
            </h4>
            <p className="text-gray-300">
              A vector database is specialized for storing and searching vectors
              efficiently. Here&apos;s what it typically stores:
            </p>

            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium text-white">For each item:</p>
                <ul className="list-disc pl-5 text-gray-300">
                  <li>Unique ID (movie_123)</li>
                  <li>Vector ([0.2, 0.8, 0.5, ...])</li>
                  <li>Metadata (title, image URL, etc.)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-white">Specialized features:</p>
                <ul className="list-disc pl-5 text-gray-300">
                  <li>Efficient indexing for fast similarity search</li>
                  <li>Support for various similarity metrics</li>
                  <li>Optimized for high-dimensional data</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-2 border border-[#353945]/40 rounded-lg">
              <p className="text-sm text-gray-400">
                <span className="font-medium">Technical note:</span> Vector
                databases use advanced indexing techniques like HNSW
                (Hierarchical Navigable Small World), Annoy, or FAISS to avoid
                comparing with every vector in the database.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium text-white mb-2">
            Beyond Recommendations: Other Vector Database Applications
          </h4>
          <p className="text-gray-300 mb-3">
            This same technology powers many modern AI applications:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3 bg-[#0f1117] rounded-lg">
              <p className="font-medium text-white">Image Search</p>
              <p className="text-gray-300 mt-1">
                Convert images to vectors capturing visual features, then find
                visually similar images.
              </p>
            </div>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <p className="font-medium text-white">Semantic Text Search</p>
              <p className="text-gray-300 mt-1">
                Find documents with similar meaning, not just matching keywords.
              </p>
            </div>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <p className="font-medium text-white">Fraud Detection</p>
              <p className="text-gray-300 mt-1">
                Find transactions with similar patterns to known fraudulent
                ones.
              </p>
            </div>

            <div className="p-3 bg-[#0f1117] rounded-lg">
              <p className="font-medium text-white">AI Chatbots</p>
              <p className="text-gray-300 mt-1">
                Store knowledge as vectors to retrieve relevant information for
                answering questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Try it yourself */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Try It Yourself: Vector Thinking
        </h3>
        <p className="text-gray-300 mb-4">
          Now that you understand the concepts, try applying vector thinking to
          a simple example:
        </p>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium text-white mb-2">
            Snack Recommendation Exercise:
          </h4>
          <ol className="list-decimal pl-5 text-gray-300 space-y-3">
            <li>
              <p>Let&apos;s use just two dimensions for simplicity:</p>
              <ul className="list-disc pl-5">
                <li>Sweetness: from 0 (not sweet) to 1 (very sweet)</li>
                <li>Crunchiness: from 0 (soft) to 1 (very crunchy)</li>
              </ul>
            </li>

            <li>
              <p>Here are some snacks with their vectors:</p>
              <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-[#0f1117] rounded-lg">
                  <p className="font-medium">Potato Chips</p>
                  <p>[Sweet: 0.1, Crunchy: 0.9]</p>
                </div>
                <div className="p-2 bg-[#0f1117] rounded-lg">
                  <p className="font-medium">Chocolate Chip Cookie</p>
                  <p>[Sweet: 0.8, Crunchy: 0.3]</p>
                </div>
                <div className="p-2 bg-[#0f1117] rounded-lg">
                  <p className="font-medium">Granola Bar</p>
                  <p>[Sweet: 0.5, Crunchy: 0.6]</p>
                </div>
              </div>
            </li>

            <li>
              <p>Questions to consider:</p>
              <ul className="list-disc pl-5">
                <li>Which two snacks are most similar?</li>
                <li>
                  If someone likes sweet snacks with medium crunch, what would
                  you recommend?
                </li>
                <li>
                  Where would a caramel popcorn go in this space? [Sweet: 0.7,
                  Crunchy: 0.8]
                </li>
              </ul>
            </li>
          </ol>

          <p className="mt-4 text-gray-400">
            This simple example demonstrates how vector representation and
            similarity work in practice.
          </p>
        </div>
      </div>

      {/* Summary and Key Takeaways */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-12">
        <h3 className="text-xl font-semibold mb-2">
          Summary: From Arrays to Vector Databases
        </h3>

        <p className="text-gray-300 mb-4">
          We&apos;ve covered a lot! Let&apos;s recap the journey we&apos;ve
          taken from simple recommendation systems to modern vector databases:
        </p>

        <div className="space-y-4">
          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              1. We started with manual lists
            </p>
            <p className="text-gray-300">
              Hand-created arrays of related items that quickly become
              unmanageable.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              2. We tried data-driven connections
            </p>
            <p className="text-gray-300">
              Tracking which items are bought together, but the matrices grow
              too large at scale.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              3. We tried a simple number line
            </p>
            <p className="text-gray-300">
              Placing items on a one-dimensional scale, but that couldn&apos;t
              capture complexity.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              4. We moved to multi-dimensional vectors
            </p>
            <p className="text-gray-300">
              Giving items multiple numbers to represent different traits,
              creating a rich feature space.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              5. We introduced vector databases
            </p>
            <p className="text-gray-300">
              Specialized storage systems that make it efficient to find similar
              vectors quickly.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 border border-[#353945] bg-[#0f1117] rounded-lg">
          <h4 className="font-medium text-white mb-2">
            Key Terms to Remember:
          </h4>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>
              <span className="text-white font-medium">Vector</span>: A list of
              numbers representing an item&apos;s traits or features.
            </li>
            <li>
              <span className="text-white font-medium">Embedding</span>: A
              vector learned from data by AI/ML systems.
            </li>
            <li>
              <span className="text-white font-medium">Similarity</span>: How
              close two vectors are in direction/pattern (often measured by
              cosine similarity).
            </li>
            <li>
              <span className="text-white font-medium">Vector Database</span>:
              Specialized storage optimized for vector similarity search.
            </li>
          </ul>
        </div>
      </div>

      {/* Next steps */}
      <div className="text-center">
        <p className="text-gray-300 mb-4">Continue learning</p>
        <div className="inline-flex gap-3">
          <Link
            href="/how-llm-works"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-4 py-2 text-sm text-white hover:bg-[#1c1f2a]/80"
          >
            How LLMs Work
          </Link>
          <Link
            href="/building-ai-chat-bots"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-4 py-2 text-sm text-white hover:bg-[#1c1f2a]/80"
          >
            Building AI Chatbots
          </Link>
          <Link
            href="/what-are-ai-agents"
            className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-red-500/20"
          >
            What are AI Agents?
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
