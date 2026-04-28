import type { DemoPageData } from "@/components/demo-page-template";

export const MVP_DATA: DemoPageData = {
  eyebrow: "MVP WEB APP",
  title: "From idea to launch.",
  subtitle:
    "Full-stack MVP web apps with auth, database, payments, and AI features. Production-ready in weeks.",
  description:
    "Most MVPs fail not because the idea is bad, but because they take too long to build. I cut MVPs down to the smallest version that proves the value, ship it fast, and iterate based on real user feedback. Your goal isn't to launch. It's to learn whether people want what you're building.",
  useCases: [
    {
      title: "SaaS Tools",
      description:
        "Internal tools, productivity apps, niche B2B SaaS. Auth, dashboards, billing, AI features: everything you need for paying users.",
    },
    {
      title: "Marketplaces",
      description:
        "Two-sided platforms with listings, search, messaging, payments. Stripe Connect for vendor payouts, AI for matching and recommendations.",
    },
    {
      title: "Content Platforms",
      description:
        "Blogs, courses, newsletters with paywall, member areas, AI-generated summaries or recommendations.",
    },
    {
      title: "Founder MVPs",
      description:
        "Pre-product validation. Get the smallest possible version live so you can show it to users, investors, and learn fast.",
    },
  ],
  whatYouGet: [
    "Full-stack Next.js app with TypeScript",
    "Authentication (email, Google, GitHub) via Supabase Auth",
    "Postgres database with type-safe queries",
    "Payments via Stripe (subscriptions or one-time)",
    "AI features integrated where they add value",
    "Deployed to Vercel under your account",
    "Full source code, your repo, your IP",
    "Documentation and 2 weeks of post-launch support",
  ],
  techStack: [
    {
      name: "Next.js + TypeScript",
      description:
        "Modern React framework. Server-side rendering, API routes, fast deploys.",
    },
    {
      name: "Tailwind + shadcn/ui",
      description:
        "Beautiful components without designing from scratch. Customizable, owned-by-you.",
    },
    {
      name: "Supabase",
      description:
        "Postgres + Auth + Storage. Open-source, no vendor lock. Free tier covers MVP traffic.",
    },
    {
      name: "Stripe",
      description:
        "Payments that just work. Subscriptions, one-time, marketplaces. Industry standard.",
    },
    {
      name: "Vercel",
      description:
        "Deployment platform. Zero-config, fast, free tier covers low-traffic MVPs.",
    },
    {
      name: "AI Integration",
      description:
        "OpenAI, Anthropic, Gemini, chosen based on your specific feature needs.",
    },
  ],
  process: [
    {
      step: "1",
      title: "Scope",
      description:
        "We define the smallest version that proves your idea. What's the one thing users must be able to do? Everything else gets cut for v1.",
    },
    {
      step: "2",
      title: "Design",
      description:
        "Wireframes for key flows. Tech architecture. Database schema. We agree on scope before building.",
    },
    {
      step: "3",
      title: "Build",
      description:
        "Weekly milestones. You see progress every week, give feedback, I adjust. Typical MVP ships in 2-6 weeks.",
    },
    {
      step: "4",
      title: "Launch",
      description:
        "Deploy to your domain. Monitoring set up. Documentation handed over. You own everything.",
    },
    {
      step: "5",
      title: "Iterate",
      description:
        "Post-launch support window for bug fixes and small adjustments. Bigger features become a follow-up project.",
    },
  ],
  faqs: [
    {
      question: "How long does an MVP take?",
      answer:
        "Depends heavily on scope. Simple landing pages with one core feature: 2 weeks. Standard SaaS MVP: 3-4 weeks. Marketplaces: 4-6 weeks. We define scope tightly to keep timelines tight.",
    },
    {
      question: "What does it cost?",
      answer:
        "Fiverr packages exist for standard scopes. Custom MVPs are quoted based on scope. Discovery calls are free. We figure out tight scope before quoting.",
    },
    {
      question: "Will it scale?",
      answer:
        "MVPs aren't built for scale. They're built to validate. The stack (Next.js, Supabase, Stripe) handles thousands of users without changes. If you reach product-market fit, scaling is a different (good) problem we solve later.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You. Source code lives in your GitHub repo. Deployed to your Vercel account, your Supabase project, your Stripe account. No subscriptions to me. No black boxes.",
    },
    {
      question: "What if I want to add features later?",
      answer:
        "Code is documented and clean. You (or another developer) can extend it. I'm also available for follow-up projects. Most clients come back for v1.5 with the features we cut from v1.",
    },
  ],
  ctaHeadline: "Ready to build your MVP?",
  ctaSubline:
    "Tell me your idea. Free discovery call. Honest scope. No commitment.",
};
