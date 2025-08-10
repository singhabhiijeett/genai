import Link from "next/link";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vector Databases & How They Work | Understanding Implementation",
  description:
    "Explore why vector databases are essential for semantic search, their internal implementations like brute force, clustering, decision trees, HNSW, and product quantization.",
  openGraph: {
    title: "Vector Databases & How They Work | Understanding Implementation",
    description:
      "Learn the fundamental concepts behind vector databases, why we need them, and the internal implementations that power modern AI applications.",
    type: "article",
  },
};

export default function VectorDatabaseImplementation() {
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
            Vector Databases & How They Work
          </span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-500 mx-auto rounded-full mb-5" />
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Understanding why we need vector databases and exploring their
          internal implementations for efficient similarity search.
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-[#1c1f2a]/60 p-6 rounded-xl border border-[#353945] mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          Why Do We Need Vector Databases?
        </h2>
        <p className="text-gray-300 mb-3">
          Consider these two queries that might be sent to a search engine:
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60 md:w-1/2">
            <p className="text-white">&quot;what is an array&quot;</p>
          </div>
          <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60 md:w-1/2">
            <p className="text-white">&quot;Array kya hota hai&quot;</p>
          </div>
        </div>
        <p className="text-gray-300 mb-3">
          These queries are asking the same question, but traditional databases
          can&apos;t recognize their similarity. This is where vector databases
          come in.
        </p>
        <p className="text-gray-300">
          SQL and NoSQL databases are designed to find exact matches based on
          known values, while vector databases are designed to find similar
          items based on conceptual meaning.
        </p>
      </div>

      {/* First Method: Brute Force */}
      <div className="bg-[#1c1f2a]/50 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          First Method: Brute Force
        </h3>
        <p className="text-gray-300 mb-4">
          The simplest approach is to convert text into vectors (numerical
          representations) and compare them using distance metrics like
          Euclidean distance or Cosine similarity.
        </p>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4 overflow-x-auto">
          <p className="mb-2 text-gray-300">
            Example of a vector: [0.9, 0.1, 0.0, 0.9, 0.1]
          </p>
          <table className="w-full text-sm text-gray-300">
            <thead className="text-white">
              <tr>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">Vector</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">onion</td>
                <td className="p-2">[0.9, 0.1, 0.0, 0.9, 0.1]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">tomato</td>
                <td className="p-2">[0.8, 0.2, 0.0, 0.8, 0.2]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">dhaniya</td>
                <td className="p-2">[0.7, 0.1, 0.0, 0.9, 0.0]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">nimbu</td>
                <td className="p-2">[0.1, 0.8, 0.1, 0.7, 0.3]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">banana</td>
                <td className="p-2">[0.1, 0.9, 0.1, 0.1, 0.8]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">protein</td>
                <td className="p-2">[0.0, 0.1, 0.9, 0.1, 0.7]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">creatine</td>
                <td className="p-2">[0.0, 0.0, 0.95, 0.0, 0.1]</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2">bcaa</td>
                <td className="p-2">[0.0, 0.0, 0.92, 0.0, 0.1]</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-2">How Distance Calculation Works</h4>
          <p className="text-gray-300 mb-2">
            For example, to find the distance between points (2,3) and (3,4):
          </p>
          <p className="text-gray-300">
            Euclidean distance: √((2-3)² + (3-4)²)
          </p>
          <p className="text-gray-300 mt-2">
            With brute force, the system compares the query vector with every
            single vector in the database, calculating the distance each time.
            It then returns the items with the shortest distances.
          </p>
        </div>

        <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium mb-2">The Problem with Brute Force</h4>
          <p className="text-gray-300">
            The reason a full scan is slow is because it&apos;s perfect. It
            calculates the distance to every single point and guarantees it
            finds the absolute closest one. This is called Exact Nearest
            Neighbor (ENN) search.
          </p>
          <p className="text-gray-300 mt-2">
            While this gives perfect results, it becomes impractical when
            dealing with billions of vectors, as the computation time scales
            linearly with the number of items.
          </p>
        </div>
      </div>

      {/* ANN Approach */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          ANN Approach: Trading Accuracy for Speed
        </h3>
        <p className="text-gray-300 mb-4">
          Approximate nearest neighbor (ANN) is an algorithm that finds a data
          point in a data set that&apos;s very close to the given query point,
          but not necessarily the absolute closest one.
        </p>
        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60">
          <p className="text-gray-300 mb-2">
            It sacrifices a tiny amount of accuracy (it might return 9 of the
            top 10, plus the 11th) for a massive gain in speed (often orders of
            magnitude faster).
          </p>
          <p className="text-gray-300">
            Let&apos;s explore several ANN approaches that make vector databases
            practical for large-scale applications.
          </p>
        </div>
      </div>

      {/* Clustering/Inverted File Index */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          First Method: Clustering/Inverted File Index - IVF
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-3 text-white">
            Phase 1: Indexing (The one-time setup)
          </h4>
          <ol className="list-decimal pl-5 text-gray-300 space-y-3">
            <li>
              <p>
                <span className="text-white font-medium">
                  Find the &apos;Centers&apos;:
                </span>{" "}
                The database first looks at all of your million vectors and uses
                an algorithm (like k-means clustering) to find, let&apos;s say,
                100 &apos;center points&apos; or centroids. Each centroid is
                itself a vector that represents the average of a region in your
                data. Think of these as the signs for the sections in our
                library: &quot;Fiction,&quot; &quot;Science,&quot; etc.
              </p>
            </li>
            <li>
              <p>
                <span className="text-white font-medium">
                  Assign to Clusters:
                </span>{" "}
                The database then goes through every single one of your million
                vectors and figures out which of the 100 centroids it&apos;s
                closest to. It then puts a &quot;pointer&quot; to that vector
                into a list for that centroid.
              </p>
            </li>
          </ol>
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-3 text-white">
            Searching (When you make a query)
          </h4>
          <ol className="list-decimal pl-5 text-gray-300 space-y-3">
            <li>
              <p>
                <span className="text-white font-medium">
                  Find the Closest Section(s):
                </span>{" "}
                The database does NOT compare your query to all one million
                vectors. Instead, it just compares it to the 100 centroids. This
                is super fast. It finds that your query is closest to, say,
                &apos;Centroid #42&apos; (the &quot;men&apos;s casual
                shirts&quot; section).
              </p>
            </li>
            <li>
              <p>
                <span className="text-white font-medium">
                  Search Only Within That Section:
                </span>{" "}
                Now, the database knows your best matches are probably in the
                list for Centroid #42. So it only searches through the 10,000
                vectors in that one cluster.
              </p>
            </li>
          </ol>
        </div>

        <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium mb-2">Example</h4>
          <p className="text-gray-300 mb-2">Consider vectors like:</p>
          <ul className="list-disc pl-5 text-gray-300 mb-2">
            <li>onion: [2,3]</li>
            <li>tomato: [3,4]</li>
            <li>grapes: [1,2]</li>
            <li>paali: [1,6]</li>
          </ul>
          <p className="text-gray-300">
            By using centroids, we might find that 3 centroids represent our
            entire dataset well, and each points to a cluster of about 10,000
            items, making searches much faster.
          </p>
        </div>
      </div>

      {/* Decision Tree Method */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Second Method: The Decision Tree Method (Binary Space Partitioning)
        </h3>
        <p className="text-gray-300 mb-4">
          What if we just took the whole space and chopped it in half? And then
          chopped those halves in half? And so on.
        </p>{" "}
        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-3 text-white">How It Works:</h4>
          <ol className="list-decimal pl-5 text-gray-300 space-y-2">
            <li>
              <p>
                <span className="text-white font-medium">First Split:</span> We
                pick a dimension (e.g., the x-axis) and find the middle point
                (the median). We draw a vertical line there. All points to the
                left go into the &quot;left&quot; branch of our tree, and all
                points to the right go into the &quot;right&quot; branch.
              </p>
            </li>
            <li>
              <p>
                <span className="text-white font-medium">Second Split:</span>{" "}
                Now we look at the two new groups. For each group, we pick the
                other dimension (the y-axis) and split it in half with a
                horizontal line.
              </p>
            </li>
            <li>
              <p>
                <span className="text-white font-medium">Keep Splitting:</span>{" "}
                We keep repeating this process, alternating which dimension we
                split on, until we only have a few points left in each final,
                tiny rectangle.
              </p>
            </li>
          </ol>
        </div>
        <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-2">Binary Tree Structure</h4>
          <div className="flex flex-col items-center space-y-6 mb-4">
            <Image
              src="/images/binary-tree-structure.svg"
              alt="Binary tree structure with nodes numbered 1-7"
              width={400}
              height={220}
              className="w-full max-w-md"
            />
            <Image
              src="/images/decision-tree-vectors.svg"
              alt="Decision tree with numbered leaf nodes and corresponding vector coordinates"
              width={500}
              height={350}
              className="w-full max-w-lg"
            />
          </div>
          <p className="text-gray-300 text-center">
            Search 3 Nearest Neighbors: Q = [13, 8]
          </p>
        </div>
      </div>

      {/* HNSW */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Approach 3: Hierarchical Navigable Small Worlds - HNSW
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-3 text-white">How HNSW Works</h4>
          <p className="text-gray-300 mb-3">
            HNSW organizes vectors in a hierarchical graph structure with
            multiple layers:
          </p>
          <ul className="list-disc pl-5 text-gray-300 mb-2">
            <li>Layer 2: Highest level with few nodes</li>
            <li>Layer 1: Mid-level with alpha=3 connections per node</li>
            <li>Layer 0: Base level with alpha=6 connections per node</li>
          </ul>
          <div className="flex justify-center mt-4 mb-4">
            <Image
              src="/images/hnsw-structure.svg"
              alt="Hierarchical Navigable Small Worlds (HNSW) structure with multiple layers"
              width={500}
              height={400}
              className="w-full max-w-xl"
            />
          </div>
        </div>

        <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
          <p className="text-gray-300">
            HNSW works by creating a &quot;skip list&quot;-like structure where
            higher levels allow for quick, coarse navigation, and lower levels
            refine the search. This approach provides both fast search speeds
            and high accuracy.
          </p>
        </div>
      </div>

      {/* Product Quantization */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Approach 4: The Compression Method (Product Quantization - PQ)
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-3 text-white">The Memory Problem</h4>
          <p className="text-gray-300 mb-3">
            A single vector using 1536 dimensions of 32-bit floating-point
            numbers takes up 1536 * 4 bytes = 6,144 bytes. If you have a billion
            vectors, that&apos;s 6.1 Terabytes of RAM! That&apos;s incredibly
            expensive.
          </p>
          <p className="text-gray-300 mb-3">
            Product Quantization solves this by compressing vectors while
            maintaining their similarity relationships.
          </p>
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h4 className="font-medium mb-3 text-white">
            How Product Quantization Works
          </h4>
          <p className="text-gray-300 mb-3">
            It chops the big vector into smaller segments. For example, a
            16-dimension vector could be chopped into 4 segments of 4 dimensions
            each. [41, 42, ..., 416] → [chunk1], [chunk2], ..., [chunk4]
          </p>

          <h5 className="text-white mb-2">Step A: Split V into chunks</h5>
          <CodeBlock
            language="text"
            code={`V = [1.1, 2.3, 0.9, 3.4, 8.8, 7.6, 9.1, 6.5, 4.2, 5.5, 3.4, 5.1, 9.9, 8.1, 7.7, 9.3]
total size = 16*4 = 64 bytes

v_chunk1 = [1.1, 2.3, 0.9, 3.4] -> mapped to [10]
v_chunk2 = [8.8, 7.6, 9.1, 6.5] -> mapped to [23]
v_chunk3 = [4.2, 5.5, 3.9, 5.1] -> mapped to [123]
v_chunk4 = [9.9, 8.1, 7.7, 9.3] -> mapped to [16]

Resulting compressed vector: [10, 23, 123, 16]`}
          />
        </div>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <h5 className="text-white mb-2">
            Step B: Create the Codebooks (k cluster/centroid)
          </h5>
          <p className="text-gray-300 mb-3">
            For each chunk position, we create a codebook of representative
            vectors:
          </p>
          <ul className="list-disc pl-5 text-gray-300 mb-3">
            <li>
              Chunk 1 (dims 1-4): We take all the first chunks and look at
              Codebook 1.
            </li>
            <li>
              Chunk 2 (dims 5-8): We do the same for the second chunks and look
              at Codebook 2.
            </li>
            <li>Chunk 3 (dims 9-12): This gives us Codebook 3.</li>
            <li>Chunk 4 (dims 13-16): This gives us Codebook 4.</li>
          </ul>
          <p className="text-gray-300 mb-2">
            Codebook 1 might look like this (for 1 billion records, chunk1 might
            have 256 clusters/centroids):
          </p>
          <CodeBlock
            language="text"
            code={`0 : [1,2,3,6,4,7,2,1]
1 : [1,1,3,2,4,5,2,8]
2 : [2,2,3,6,5,7,1,1]
3 : [1,1,2,4,1,0,3,3]
...
255 : [4,2,3,6,1,7,2,1]`}
          />
        </div>

        <div className="bg-[#0f1117] p-4 rounded-lg border border-[#353945]/60">
          <h4 className="font-medium mb-3 text-white">How to search a query</h4>
          <p className="text-gray-300 mb-2">
            For a query Q = [1.5, 2.1, 0.8, 3.4, 8.1, 7.9, 9.0, 6.6, 4.8, 5.2,
            4.1, 5.0, 9.5, 8.3, 7.9, 9.1]:
          </p>
          <ol className="list-decimal pl-5 text-gray-300 space-y-2 mb-3">
            <li>
              Split Q into chunks, just like we did for vectors in our database
            </li>
            <li>
              For each chunk, compute distances to all centroids in the
              corresponding codebook
            </li>
            <li>Build a distance lookup table for fast comparisons</li>
            <li>
              Use these tables to estimate distances between Q and compressed
              vectors
            </li>
          </ol>
          <p className="text-gray-300">
            This allows for extremely memory-efficient vector storage while
            maintaining reasonably accurate similarity searches.
          </p>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-[#1c1f2a]/30 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Which Method is &quot;Best&quot;? A Comparison
        </h3>

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="text-white">
              <tr>
                <th className="p-2 text-left">Method</th>
                <th className="p-2 text-left">Speed (Query Latency)</th>
                <th className="p-2 text-left">Accuracy (Recall)</th>
                <th className="p-2 text-left">Memory Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">HNSW</td>
                <td className="p-2">Highest</td>
                <td className="p-2">Highest</td>
                <td className="p-2">Highest</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">IVFPQ (Hybrid)</td>
                <td className="p-2">High</td>
                <td className="p-2">High (with re-ranking)</td>
                <td className="p-2">Lowest by Far</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">IVF (Standalone)</td>
                <td className="p-2">Medium</td>
                <td className="p-2">Medium</td>
                <td className="p-2">Low</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Trees (e.g., KD-Tree)</td>
                <td className="p-2">Low (in high dimensions)</td>
                <td className="p-2">Low</td>
                <td className="p-2">Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Comparison */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Database / Library Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="text-white">
              <tr>
                <th className="p-2 text-left">Database/Library</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Key Feature / Philosophy</th>
                <th className="p-2 text-left">Primary Indexing Technique(s)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Milvus</td>
                <td className="p-2">Native</td>
                <td className="p-2">
                  Open-source, highly scalable, MLOps-focused. Decoupled storage
                  & compute.
                </td>
                <td className="p-2">
                  Highly Flexible: HNSW, IVFPQ, IVFFlat, and others.
                </td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Pinecone</td>
                <td className="p-2">Native</td>
                <td className="p-2">
                  Managed service (SaaS), ease of use, performance-focused.
                </td>
                <td className="p-2">HNSW</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Weaviate</td>
                <td className="p-2">Native</td>
                <td className="p-2">
                  Open-source, GraphQL API, connects vectors in a knowledge
                  graph.
                </td>
                <td className="p-2">HNSW</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Qdrant</td>
                <td className="p-2">Native</td>
                <td className="p-2">
                  Open-source, performance-focused with advanced filtering.
                  Written in Rust.
                </td>
                <td className="p-2">HNSW with custom quantization.</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">PostgreSQL (pgvector)</td>
                <td className="p-2">Integrated</td>
                <td className="p-2">
                  Keep your structured data and vectors together in a trusted
                  relational DB.
                </td>
                <td className="p-2">IVFFlat and HNSW</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Elasticsearch</td>
                <td className="p-2">Integrated</td>
                <td className="p-2">
                  Combine traditional keyword search with semantic vector search
                  in one query.
                </td>
                <td className="p-2">HNSW</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Redis</td>
                <td className="p-2">Integrated</td>
                <td className="p-2">
                  In-memory speed, combining vector search with other Redis data
                  structures.
                </td>
                <td className="p-2">HNSW</td>
              </tr>
              <tr className="border-t border-[#353945]/30">
                <td className="p-2 font-medium">Faiss (by Meta)</td>
                <td className="p-2">Library</td>
                <td className="p-2">
                  The foundational C++/Python toolkit. Not a DB, but powers many
                  others.
                </td>
                <td className="p-2">
                  The Reference: HNSW, IVFPQ, and many more.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* What data is actually stored */}
      <div className="bg-[#1c1f2a]/30 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          What Data is Actually Stored
        </h3>

        <div className="bg-[#13151b] p-4 rounded-lg border border-[#353945]/60 mb-4">
          <p className="text-gray-300 mb-3">
            Vector databases typically store three types of information:
          </p>

          <CodeBlock
            language="typescript"
            code={`// Example record in a vector database
{
  id: "product_456", // unique identifier
  vector: [0.98, 0.23, -0.11, ...], // the numerical representation
  metadata: {
    product_name: "Red Running Shoes",
    price: 89.99,
    link: "https://example.com/shoes/456"
  }
}`}
          />

          <div className="mt-4 flex justify-center">
            <Image
              src="/images/vector-representation.svg"
              alt="Vector representation and bidirectional relationship between text and vectors"
              width={500}
              height={280}
              className="w-full max-w-xl"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[#1c1f2a]/40 p-6 rounded-xl border border-[#353945] mb-10">
        <h3 className="text-xl font-semibold mb-2">
          Summary: Vector Databases and Their Implementation
        </h3>

        <div className="space-y-4">
          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              1. Vector databases solve the similarity search problem
            </p>
            <p className="text-gray-300">
              They allow us to find items based on meaning and similarity rather
              than exact matches.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              2. Brute force is accurate but slow
            </p>
            <p className="text-gray-300">
              Calculating distance to every vector gives perfect results but
              becomes impractical at scale.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              3. Approximate methods offer speed-accuracy tradeoffs
            </p>
            <p className="text-gray-300">
              IVF clustering, tree-based partitioning, HNSW, and product
              quantization all offer different approaches to the same problem.
            </p>
          </div>

          <div className="p-3 bg-[#0f1117] rounded-lg">
            <p className="font-medium text-white">
              4. Modern vector databases combine techniques
            </p>
            <p className="text-gray-300">
              Most production systems use combinations of these methods to
              balance speed, accuracy, and memory usage.
            </p>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="text-center">
        <p className="text-gray-300 mb-4">Continue learning</p>
        <div className="inline-flex gap-3 flex-wrap justify-center">
          <Link
            href="/what-are-vectors"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-4 py-2 text-sm text-white hover:bg-[#1c1f2a]/80"
          >
            What Are Vectors
          </Link>
          <Link
            href="/how-llm-works"
            className="rounded-lg bg-[#1c1f2a]/50 border border-[#353945] px-4 py-2 text-sm text-white hover:bg-[#1c1f2a]/80"
          >
            How LLMs Work
          </Link>
          <Link
            href="/building-ai-chat-bots"
            className="rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white hover:shadow-lg hover:shadow-red-500/20"
          >
            Building AI Chatbots
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
