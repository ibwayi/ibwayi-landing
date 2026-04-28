import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Sliding-window rate limit for the chat API: 10 messages per IP per
 * 1-hour window. State lives in Upstash Redis so it survives page
 * refreshes, deploys, and serverless cold-starts.
 *
 * Returns `null` if Upstash env vars are missing — typical for local
 * dev when chatting with a local Ollama. The route treats null as
 * "skip rate-limit check"; production must have both env vars set.
 */
export const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(10, "1 h"),
        analytics: true,
        prefix: "chat-rl",
      })
    : null;

/**
 * Best-effort client-IP extraction. On Vercel, x-forwarded-for is set
 * to a comma-separated chain — first entry is the original client IP.
 * Falls back to x-real-ip, then to the literal "anonymous" so local
 * dev still gets a key (even if rate-limit is null there).
 */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "anonymous";
}
