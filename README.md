# Ibwayi Landing

Landing page for **[ibwayi.com](https://ibwayi.com)** — Ibwayi's AI Solutions portfolio site.

## What it does

Showcases Ibwayi's three service tracks — chatbots, business automation, and custom MVP apps — with live demos and a floating chat widget that answers visitor questions about the work.

## Tech stack

| Layer        | Choice                                       |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router) + TypeScript         |
| Styling      | Tailwind CSS v4                              |
| Components   | shadcn/ui + Aceternity UI                    |
| Motion       | Framer Motion                                |
| Theming      | next-themes (dark default)                   |
| Chat / LLM   | AI SDK v6 (OpenAI or Anthropic provider)     |
| Rate limit   | Upstash Redis                                |
| Hosting      | Vercel                                       |

## Local development

```bash
pnpm install
pnpm dev
```

The site runs at <http://localhost:3000>. Copy `.env.example` to `.env.local` and fill in keys if you want the chat widget to respond locally.

<details>
<summary><strong>Deploy / Operations checklist</strong></summary>

The floating chat widget calls a real LLM provider, so before flipping the production deploy on, walk through this:

- [ ] Vercel env vars set in **all three** environments (Production, Preview, Development):
  - `AI_PROVIDER=openai` (or `anthropic`)
  - `OPENAI_API_KEY=…` (or `ANTHROPIC_API_KEY=…`)
  - `UPSTASH_REDIS_REST_URL=…` and `UPSTASH_REDIS_REST_TOKEN=…` for chat rate-limit
- [ ] **Hard spend limit set in the AI provider's dashboard**
  - OpenAI: <https://platform.openai.com/account/limits> — recommended monthly cap **$10**
  - Anthropic: <https://console.anthropic.com/settings/limits> — same idea
  - This is the last line of defence if rate-limit fails open. Don't skip.
- [ ] Smoke-test the chat on the preview URL: bubble appears → opens panel → sends message → gets streamed reply. If 500s, the env vars are missing on Vercel.
- [ ] Verify rate-limit in production: send 11 messages from one IP within an hour; the 11th should return a 429 and the panel should show the CTA card with the "Limit resets in ~X minutes" line.

</details>
