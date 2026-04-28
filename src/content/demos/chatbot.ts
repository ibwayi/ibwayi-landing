import type { DemoPageData } from "@/components/demo-page-template";

export const CHATBOT_DATA: DemoPageData = {
  eyebrow: "AI CHATBOT",
  title: "Chatbots that actually help.",
  subtitle:
    "FAQ bots, lead qualifiers, customer support, built around your business.",
  description:
    "Most chatbots fail because they're generic. They give canned answers to specific questions. I build chatbots that know your business: your products, your policies, your tone. They integrate with your tools so they can take real action, not just talk.",
  useCases: [
    {
      title: "FAQ & Support",
      description:
        "Handle 60-80% of repetitive customer questions without involving your team. Bot answers based on your docs, escalates complex cases.",
    },
    {
      title: "Lead Qualification",
      description:
        "Bot greets visitors, asks qualifying questions, captures contact info, and routes hot leads directly to your sales channel.",
    },
    {
      title: "Booking & Reservations",
      description:
        "Bot guides users through availability, takes bookings, integrates with your calendar (Cal.com, Calendly, Google Calendar).",
    },
    {
      title: "Product Recommendations",
      description:
        "Bot helps users find the right product based on their needs. Integrates with your catalog, links directly to checkout.",
    },
  ],
  whatYouGet: [
    "Custom system prompt tuned to your brand voice",
    "Integration with your knowledge base (docs, FAQs, product info)",
    "Lead capture with email notifications or CRM integration",
    "Floating widget or embedded chat, your choice",
    "Rate limiting and cost protection built-in",
    "Full source code, deployable to your accounts",
    "Support window after launch",
  ],
  techStack: [
    {
      name: "OpenAI GPT-4o-mini",
      description:
        "Cost-effective for production. Fast, reliable, good at following instructions.",
    },
    {
      name: "Anthropic Claude Haiku",
      description:
        "Premium reasoning when nuance matters. Great for support and qualification.",
    },
    {
      name: "Google Gemini Flash",
      description:
        "Huge context windows when bot needs to read large knowledge bases.",
    },
    {
      name: "Vercel AI SDK",
      description:
        "Streaming responses, tool calls, provider-agnostic. Standard for production AI apps.",
    },
  ],
  process: [
    {
      step: "1",
      title: "Discovery call",
      description:
        "30-min call. We talk about your audience, what the bot should do, what it shouldn't, your tools and constraints.",
    },
    {
      step: "2",
      title: "Custom demo",
      description:
        "I build a small working demo with your specific use case. You see it live before signing anything.",
    },
    {
      step: "3",
      title: "Build & iterate",
      description:
        "Weekly progress updates. You review, give feedback, I adjust. Most chatbot projects ship in 1-2 weeks.",
    },
    {
      step: "4",
      title: "Launch & handover",
      description:
        "Deploy to your accounts. Full handover docs. Support window included for tuning and edge cases.",
    },
  ],
  faqs: [
    {
      question: "How long does it take?",
      answer:
        "Most chatbot projects ship in 1-2 weeks. Simpler FAQ bots can be done in 3-5 days. Complex integrations with your tools take longer.",
    },
    {
      question: "What does it cost?",
      answer:
        "Fiverr packages start at fixed prices for standard scopes. For custom projects, scope determines price. Discovery calls are free. We figure out the right scope before any commitment.",
    },
    {
      question: "Do I own the bot?",
      answer:
        "Yes. You get full source code, deployed to your accounts (your OpenAI API key, your hosting). No vendor lock, no monthly fees to me. You can extend or migrate it anytime.",
    },
    {
      question: "Which AI provider should I use?",
      answer:
        "Depends on your use case. OpenAI is the default for cost/speed. Claude shines for nuanced reasoning. Gemini for huge context. I'll recommend based on your needs.",
    },
    {
      question: "What about data privacy?",
      answer:
        "Your data goes to the AI provider you choose. All major providers (OpenAI, Anthropic, Google) offer API plans with no training-data usage. For sensitive use cases, we can use self-hosted models.",
    },
  ],
  ctaHeadline: "Ready to build your chatbot?",
  ctaSubline:
    "Check Fiverr for fixed packages, or message Ibwayi directly for custom scope.",
};
