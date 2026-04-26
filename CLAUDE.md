# CLAUDE.md — ibwayi-landing

Working directory for Claude Code on the ibwayi.com landing page repo.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (theme via @theme inline in globals.css, no tailwind.config.ts)
- shadcn/ui (preset: base-nova) + Aceternity UI components (manual copy-paste in src/components/aceternity/)
- Framer Motion + next-themes
- pnpm
- Deployed on Vercel

## Conventions
- Default theme: dark (master brand). next-themes with enableSystem=false.
- Brand: Premium Dark + Electric Violet (#A855F7). Inter typography.
- All routes are server components by default. Client components opt-in with "use client".
- Commit style: Conventional Commits (chore:, feat:, fix:, docs:).
- Living docs (TICKETPLAN.md / DECISIONS.md / PROJECT_CONTEXT.md) come in ticket 7.7. Until then, decisions live in the parent repo (~/projects/ai-templates/docs/).

## Folder structure
- src/app/                 — routes (/, /demos, /demos/[chatbot|automation|mvp])
- src/components/ui/       — shadcn components
- src/components/aceternity/ — Aceternity components (manual copy from ui.aceternity.com)
- src/components/sections/ — page-level sections (Hero, Services, etc.)
- src/components/providers/— context providers (ThemeProvider)
- src/lib/                 — utils
