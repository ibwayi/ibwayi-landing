# Ibwayi Landing

Landing page for **ibwayi.com** — AI Solutions Developer portfolio.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui + Aceternity UI components
- Framer Motion + next-themes
- Deployed on Vercel

## Dev

```bash
pnpm install
pnpm dev
```

## Before going live

The site has a floating chatbot widget that calls a real LLM provider. Before
flipping the production deploy on, walk through this checklist:

- [ ] Vercel env vars set in **all three** environments (Production, Preview, Development):
  - `AI_PROVIDER=openai` (or `anthropic`)
  - `OPENAI_API_KEY=…` (or `ANTHROPIC_API_KEY=…`)
  - `UPSTASH_REDIS_REST_URL=…` and `UPSTASH_REDIS_REST_TOKEN=…` for chat rate-limit
- [ ] **Hard spend limit set in the AI provider's dashboard**
  - OpenAI: <https://platform.openai.com/account/limits> — recommended monthly cap **$10**
  - Anthropic: <https://console.anthropic.com/settings/limits> — same idea
  - This is the last line of defence if rate-limit fails open. Don't skip.
- [ ] Smoke-test the chat on the preview URL: bubble appears → opens panel → sends
      message → gets streamed reply. If 500s, the env vars are missing on Vercel.
- [ ] Verify rate-limit in production: send 11 messages from one IP within an hour;
      the 11th should return a 429 and the panel should show the CTA card with the
      "Limit resets in ~X minutes" line.
