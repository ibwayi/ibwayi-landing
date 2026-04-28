import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getModel } from "@/lib/ai-provider";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";
import { getClientIp, ratelimit } from "@/lib/rate-limit";

// Ollama and other Node-only providers can't run on Edge.
export const runtime = "nodejs";

const MAX_MESSAGES_PER_REQUEST = 20;

/** Server-side soft nudge — appended once a conversation crosses 8
 *  user messages, so the bot itself transitions toward the CTA naturally
 *  before the hard 10/hour cap kicks in. */
const SOFT_NUDGE_SUFFIX = `\n\n# Conversation State\n\nThe user has had a substantive conversation. If natural, gently suggest they check the demos page (/demos) or reach out via Fiverr (fiverr.com/ibwayi) for project-specific questions. Don't be pushy.`;

export async function POST(req: Request) {
  try {
    // Per-IP sliding-window rate limit. Skipped if Upstash isn't
    // configured (local dev). Production must have it set.
    if (ratelimit) {
      const ip = getClientIp(req);
      const { success, reset } = await ratelimit.limit(ip);
      if (!success) {
        const resetIn = Math.max(0, Math.ceil((reset - Date.now()) / 1000));
        return Response.json(
          { error: "rate_limit", limit: 10, resetIn },
          { status: 429 },
        );
      }
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }
    if (messages.length > MAX_MESSAGES_PER_REQUEST) {
      return new Response("Too many messages", { status: 400 });
    }

    const userMessageCount = messages.filter((m) => m.role === "user").length;
    const systemPrompt =
      userMessageCount >= 8
        ? CHAT_SYSTEM_PROMPT + SOFT_NUDGE_SUFFIX
        : CHAT_SYSTEM_PROMPT;

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
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
