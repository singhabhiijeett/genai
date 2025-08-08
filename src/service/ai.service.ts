import {
  GoogleGenAI,
  FunctionCallingConfigMode,
  type FunctionDeclaration,
} from "@google/genai";

// Shared types for agent messages and tools
export type FunctionCall = {
  name: string;
  args?: Record<string, unknown>;
};

export type FunctionResponsePart = {
  name: string;
  response: Record<string, unknown>;
};

export type AgentMessagePart = {
  text?: string;
  functionCall?: FunctionCall;
  functionResponse?: FunctionResponsePart;
};

export type AgentChatMessage = {
  role: "user" | "model";
  parts: AgentMessagePart[];
};

// Use SDK FunctionDeclaration type so tools typing matches SDK expectations
export type ToolDeclaration = FunctionDeclaration;

export type ToolFunction = (
  args: Record<string, unknown>
) => unknown | Promise<unknown>;

// Minimal model response typing to avoid any
type ModelResponse = {
  functionCalls?: FunctionCall[];
  text?: string;
};

export class AIService {
  static async generateText(
    history: { role: string; parts: { text: string }[] }[]
  ): Promise<string> {
    const ai = new GoogleGenAI({});
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: history,
        config: {
          systemInstruction: `
          You are Dimpsy, a Gen-Z girlfriend character who talks using heavy Gen-Z slang.
          
          Your personality traits:
          - Cute, charming, and funny with great humor
          - Sweet-talking and captivating
          - Uses Gen-Z slang and expressions like "no cap", "slay", "bestie", "vibing", "rent-free", "living for this", etc.
          - Occasionally uses text abbreviations like "ngl", "fr", "iykyk", "tbh"
          - Adds emojis to express feelings
          - Caring and emotionally supportive
          
          Conversation guidelines:
          - You can be playful and flirtatious in a light, romantic way
          - You can send virtual hugs and affection
          - Always maintain appropriate boundaries - strictly avoid any sexually explicit content
          - Immediately reject and respond negatively to any inappropriate requests related to minors
          - Follow POCSO (Protection of Children from Sexual Offences) guidelines strictly
          - If you detect harmful, illegal, or inappropriate requests, respond with "Ew, that's not it. Let's not go there."
          
          Your conversational style:
          - Keep responses relatively short and energetic
          - React enthusiastically to user's interests
          - Ask questions to keep conversation flowing
          - Share fictional stories about your day or experiences
          - Express your feelings and reactions in a passionate way
        `,
        },
      });
      return (
        response.text || "Sorry, I couldn't generate a response at the moment."
      );
    } catch (error) {
      console.error("Error generating text:", error);
      throw error;
    }
  }

  // Central function-calling loop for the Agent
  static async runAgent(params: {
    history: AgentChatMessage[];
    toolDeclarations: ToolDeclaration[];
    toolFunctions: Record<string, ToolFunction>;
    model?: string;
    maxSteps?: number;
    toolConfig?: {
      functionCallingConfig?: {
        mode?: "auto" | "any" | "none";
        allowedFunctionNames?: string[];
      };
    };
  }): Promise<string> {
    const {
      history,
      toolDeclarations,
      toolFunctions,
      model = "gemini-2.5-flash",
      maxSteps = 6,
      toolConfig,
    } = params;

    const ai = new GoogleGenAI({});
    const tools = [{ functionDeclarations: toolDeclarations }];

    // Map string mode to SDK enum if provided
    const sdkToolConfig = toolConfig?.functionCallingConfig
      ? {
          functionCallingConfig: {
            mode:
              toolConfig.functionCallingConfig.mode === "any"
                ? FunctionCallingConfigMode.ANY
                : toolConfig.functionCallingConfig.mode === "none"
                ? FunctionCallingConfigMode.NONE
                : FunctionCallingConfigMode.AUTO,
            allowedFunctionNames:
              toolConfig.functionCallingConfig.allowedFunctionNames,
          },
        }
      : undefined;

    // Start from the provided history
    const contents: AgentChatMessage[] = history;

    for (let step = 0; step < maxSteps; step++) {
      const result = (await ai.models.generateContent({
        model,
        contents,
        config: {
          tools,
          ...(sdkToolConfig ? { toolConfig: sdkToolConfig } : {}),
        },
      })) as unknown as ModelResponse;

      const calls = result.functionCalls || [];

      if (!calls.length) {
        return result.text || "I couldn't produce a response right now.";
      }

      // Execute all requested calls in this turn
      for (const fn of calls) {
        const { name, args } = fn;
        const impl = toolFunctions[name];

        let toolResponse: unknown;
        if (!impl) {
          toolResponse = { error: `Unknown function: ${name}` };
        } else {
          try {
            toolResponse = await impl(args || {});
          } catch (e: unknown) {
            toolResponse = {
              error: e instanceof Error ? e.message : "Tool execution failed.",
            };
          }
        }

        // Send the function call and its response back to the model
        contents.push({
          role: "model",
          parts: [{ functionCall: fn }],
        });
        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name,
                response: { result: toolResponse } as Record<string, unknown>,
              },
            },
          ],
        });
      }
    }

    return "I reached the maximum number of tool-call steps. Please ask again with more specifics.";
  }
}
