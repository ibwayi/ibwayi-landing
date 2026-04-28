import type { DemoPageData } from "@/components/demo-page-template";

export const AUTOMATION_DATA: DemoPageData = {
  eyebrow: "AI AUTOMATION",
  title: "Automate the boring stuff.",
  subtitle:
    "Webhook-driven AI workflows that connect your tools and save hours every week.",
  description:
    "If you find yourself copying data between apps, triggering tasks manually, or processing emails one at a time, those are automation candidates. AI makes automations smarter: they can read context, make decisions, and respond in human language. I build the workflows that turn manual chores into background processes.",
  demoScreenshot: "/demos/automation.png",
  demoLiveUrl: "https://automation.ibwayi.com",
  useCases: [
    {
      title: "Email Triage",
      description:
        "Incoming emails get classified, summarized, and routed. AI extracts key info, logs to your CRM, drafts replies for your review.",
    },
    {
      title: "Lead Enrichment",
      description:
        "New lead enters your CRM. AI looks up their company, social profiles, recent activity. Adds context, flags hot leads.",
    },
    {
      title: "Content Pipeline",
      description:
        "From idea to published. AI helps draft, format, optimize, schedule across platforms (LinkedIn, Twitter, blog, newsletter).",
    },
    {
      title: "Internal Tools",
      description:
        "Slack/Discord bots that wrap your business logic. Team queries data, triggers reports, runs ops tasks via natural language.",
    },
  ],
  whatYouGet: [
    "Custom workflow tailored to your tools and data",
    "Self-hosted (n8n on your server) or SaaS (Zapier/Make), your choice",
    "AI reasoning steps where they add value (not everywhere)",
    "Error handling and retry logic",
    "Logging and monitoring so you know what's happening",
    "Documentation of all integrations and data flows",
    "Handover and 2 weeks of post-launch support",
  ],
  techStack: [
    {
      name: "n8n",
      description:
        "Self-hosted automation. Visual workflow builder. Open-source. You own the data and runtime.",
    },
    {
      name: "Zapier",
      description:
        "SaaS-only. 5000+ integrations. Best when you want zero ops overhead.",
    },
    {
      name: "Make (Integromat)",
      description:
        "Mid-ground. More flexible than Zapier, less to manage than n8n.",
    },
    {
      name: "Custom Webhooks",
      description:
        "When pre-built tools don't fit. Vercel/Railway-hosted, in your stack.",
    },
  ],
  process: [
    {
      step: "1",
      title: "Audit",
      description:
        "We identify workflows worth automating. Not everything should be automated. Only repetitive, high-frequency, low-decision tasks.",
    },
    {
      step: "2",
      title: "Design",
      description:
        "I sketch the workflow architecture. What triggers it? What data flows where? Where does AI add value?",
    },
    {
      step: "3",
      title: "Build",
      description:
        "Implementation in your chosen tool. Most automations ship in 1-3 days. Complex multi-stage workflows take a week.",
    },
    {
      step: "4",
      title: "Deploy & monitor",
      description:
        "Live in your accounts. Logging in place so you can see what's running. Handover docs and tuning support.",
    },
  ],
  faqs: [
    {
      question: "Self-hosted or SaaS?",
      answer:
        "Depends on volume, control, and ops capacity. Self-hosted (n8n) wins on cost at scale and full data ownership. SaaS (Zapier) wins on zero-ops and ecosystem breadth. We'll pick during discovery.",
    },
    {
      question: "How fast can it go live?",
      answer:
        "Simple integrations: 1-2 days. Multi-step workflows with AI: 3-5 days. Complex enterprise integrations: 1-2 weeks.",
    },
    {
      question: "What if a step fails?",
      answer:
        "All workflows have error handling: retry logic, fallback paths, alerts to you when something needs human attention. You won't find out about a broken automation a month later.",
    },
    {
      question: "Can I see what's running?",
      answer:
        "Yes. Every workflow has logs, dashboard, and alerts. You see what triggered, what happened, what failed, in real-time.",
    },
    {
      question: "What about API costs?",
      answer:
        "AI calls cost money. I optimize for cheap models where possible (gpt-4o-mini, Haiku) and structure workflows so AI is only invoked when needed. Most automations cost $1-20/month at moderate volume.",
    },
  ],
  ctaHeadline: "Ready to automate?",
  ctaSubline:
    "Tell me what's eating your time. I'll show you what we can automate.",
};
