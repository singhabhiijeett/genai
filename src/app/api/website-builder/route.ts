import { AIService } from "@/service/ai.service";

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return Response.json({ error: "prompt is required" }, { status: 400 });
    }

    const html = await AIService.generateWebsiteHtml(prompt);
    if (!html) {
      return Response.json(
        { error: "Empty response from model" },
        { status: 502 }
      );
    }

    return Response.json({ html });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to generate site";
    return Response.json({ error: msg }, { status: 500 });
  }
}
