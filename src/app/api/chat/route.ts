import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getModel } from "@/lib/ai-provider";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";

// Ollama and other Node-only providers can't run on Edge.
export const runtime = "nodejs";

const MAX_MESSAGES_PER_REQUEST = 20;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }
    if (messages.length > MAX_MESSAGES_PER_REQUEST) {
      return new Response("Too many messages", { status: 400 });
    }

    const result = streamText({
      model: getModel(),
      system: CHAT_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: 0.6,
      maxOutputTokens: 300,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal error", { status: 500 });
  }
}
