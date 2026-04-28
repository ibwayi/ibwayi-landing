import {
  convertToModelMessages,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { getModel } from "@/lib/ai-provider";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";
import { sendLeadEmail } from "@/lib/lead-email";
import { getClientIp, ratelimit } from "@/lib/rate-limit";

// Ollama and other Node-only providers can't run on Edge.
export const runtime = "nodejs";

const MAX_MESSAGES_PER_REQUEST = 30;

/** Server-side soft nudge — appended once a conversation crosses 8
 *  user messages, so the bot itself transitions toward the next-step
 *  CTA naturally before the hard 10/hour cap kicks in. */
const SOFT_NUDGE_SUFFIX = `\n\n# Conversation State\n\nThe user has had a substantive conversation. If natural, gently encourage them to either submit a lead (via the submit_lead tool) or visit Fiverr (fiverr.com/ibwayi) to take the next step. Don't be pushy.`;

export async function POST(req: Request) {
  try {
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
      maxOutputTokens: 400,
      tools: {
        submit_lead: tool({
          description:
            "Submit a lead to Ibwayi. Call this ONLY after collecting both the user's email AND a clear use-case description. Do not call with placeholder values.",
          inputSchema: z.object({
            email: z.string().email().describe("User's email address"),
            use_case: z
              .string()
              .min(10)
              .describe(
                "What the user wants built (chatbot/automation/MVP) plus brief context (1-2 sentences)",
              ),
            company_or_website: z
              .string()
              .optional()
              .describe("User's company or website URL if mentioned"),
            project_type: z
              .enum(["chatbot", "automation", "mvp", "custom"])
              .describe("Best-fit category"),
          }),
          execute: async ({
            email,
            use_case,
            company_or_website,
            project_type,
          }) => {
            try {
              await sendLeadEmail({
                email,
                use_case,
                company_or_website,
                project_type,
              });
              return {
                success: true as const,
                message: `Lead submitted. Ibwayi will email ${email} within 24h.`,
              };
            } catch (error) {
              console.error("Lead email failed:", error);
              return {
                success: false as const,
                message:
                  "Lead capture failed temporarily. Suggest the user message Ibwayi directly via fiverr.com/ibwayi.",
              };
            }
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal error", { status: 500 });
  }
}
