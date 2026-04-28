import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

/**
 * Provider-agnostic model resolver. Switch via AI_PROVIDER env var.
 *
 * - `ollama`: routes to Ollama's OpenAI-compatible endpoint at
 *   http://localhost:11434/v1. We use @ai-sdk/openai with a custom
 *   baseURL rather than the community ollama-ai-provider package —
 *   that package is pinned to AI SDK v3 / zod v3 and doesn't compose
 *   cleanly with AI SDK v6 (current). The OpenAI-compat path is the
 *   official Ollama-recommended way to use third-party SDKs.
 * - `openai`: standard OPENAI_API_KEY path.
 * - `anthropic`: standard ANTHROPIC_API_KEY path.
 *
 * The default is `ollama` for local-dev convenience. Production
 * (Vercel) overrides via env to `openai` or `anthropic` with a key.
 */
type Provider = "ollama" | "openai" | "anthropic";

export function getModel(): LanguageModel {
  const provider = (process.env.AI_PROVIDER ?? "ollama") as Provider;

  switch (provider) {
    case "ollama": {
      // Ollama's OpenAI-compat endpoint requires _some_ apiKey value
      // even though it's ignored — pass the literal "ollama".
      const ollama = createOpenAI({
        baseURL: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
        apiKey: "ollama",
        name: "ollama",
      });
      return ollama(process.env.OLLAMA_MODEL ?? "qwen2.5:7b");
    }
    case "openai": {
      const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      return openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini");
    }
    case "anthropic": {
      const anthropic = createAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
      return anthropic(process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5");
    }
    default:
      throw new Error(`Unknown AI_PROVIDER: ${provider as string}`);
  }
}
