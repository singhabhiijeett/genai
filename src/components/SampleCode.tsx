"use client";
import React from "react";

const SampleCode = () => {
  // Manual syntax highlighting for code
  return (
    <pre className="bg-[#13151b] p-4 rounded-lg overflow-x-auto text-sm">
      <code className="font-mono">
        <div className="flex flex-col space-y-1 text-gray-300">
          <div>
            <span className="text-blue-400">import</span> {"{"} GoogleGenAI{" "}
            {"}"} <span className="text-blue-400">from</span>{" "}
            <span className="text-green-400">&quot;@google/genai&quot;</span>;
          </div>
          <div>&nbsp;</div>
          <div>
            <span className="text-blue-400">const</span> ai ={" "}
            <span className="text-blue-400">new</span>{" "}
            <span className="text-yellow-300">GoogleGenAI</span>();
          </div>
          <div>&nbsp;</div>
          <div>
            <span className="text-blue-400">async</span>{" "}
            <span className="text-blue-400">function</span>{" "}
            <span className="text-yellow-300">main</span>() {"{"}
          </div>
          <div>
            &nbsp;&nbsp;<span className="text-blue-400">const</span> chat ={" "}
            <span className="text-blue-400">await</span> ai.chats.
            <span className="text-yellow-300">create</span>({"{"}
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;model:{" "}
            <span className="text-green-400">&quot;gemini-2.5-flash&quot;</span>
            ,
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;history: [</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;role:{" "}
            <span className="text-green-400">&quot;user&quot;</span>,
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parts: [{"{"} text:{" "}
            <span className="text-green-400">&quot;Hello&quot;</span> {"}"}],
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"},</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;role:{" "}
            <span className="text-green-400">&quot;model&quot;</span>,
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parts: [{"{"} text:{" "}
            <span className="text-green-400">
              &quot;Great to meet you. What would you like to know?&quot;
            </span>{" "}
            {"}"}],
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"},</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;],</div>
          <div>&nbsp;&nbsp;{"}"});</div>
          <div>&nbsp;</div>
          <div>
            &nbsp;&nbsp;<span className="text-blue-400">const</span> response1 ={" "}
            <span className="text-blue-400">await</span> chat.
            <span className="text-yellow-300">sendMessage</span>({"{"}
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;message:{" "}
            <span className="text-green-400">
              &quot;I have 2 dogs in my house.&quot;
            </span>
            ,
          </div>
          <div>&nbsp;&nbsp;{"}"});</div>
          <div>
            &nbsp;&nbsp;console.<span className="text-yellow-300">log</span>(
            <span className="text-green-400">&quot;Chat response 1:&quot;</span>
            , response1.text);
          </div>
          <div>&nbsp;</div>
          <div>
            &nbsp;&nbsp;<span className="text-blue-400">const</span> response2 ={" "}
            <span className="text-blue-400">await</span> chat.
            <span className="text-yellow-300">sendMessage</span>({"{"}
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;message:{" "}
            <span className="text-green-400">
              &quot;How many paws are in my house?&quot;
            </span>
            ,
          </div>
          <div>&nbsp;&nbsp;{"}"});</div>
          <div>
            &nbsp;&nbsp;console.<span className="text-yellow-300">log</span>(
            <span className="text-green-400">&quot;Chat response 2:&quot;</span>
            , response2.text);
          </div>
          <div>{"}"}</div>
          <div>&nbsp;</div>
          <div>
            <span className="text-blue-400">await</span>{" "}
            <span className="text-yellow-300">main</span>();
          </div>
        </div>
      </code>
    </pre>
  );
};

export default SampleCode;
