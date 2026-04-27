"use client";

import { motion } from "motion/react";
import { MessageSquare, Rocket, Workflow } from "lucide-react";
import { ServiceCard } from "@/components/sections/service-card";

const EASE_OUT_QUINT = [0.16, 1, 0.3, 1] as const;

/**
 * Order is locked per DECISION #64: Chatbot → Automation → MVP.
 * Pricing intentionally not shown (DECISION #62).
 */
const services = [
  {
    slug: "chatbot",
    eyebrow: "CHATBOT",
    sublabel: "Customer Service & Lead Capture",
    headline: "AI Chatbots that actually answer",
    description:
      "Trained on your business data. Embedded on your site, in WhatsApp, or wherever your customers are. Handles FAQs, qualifies leads, books appointments.",
    tags: ["OpenAI", "Claude", "Gemini"],
    href: "/demos/chatbot",
    icon: MessageSquare,
  },
  {
    slug: "automation",
    eyebrow: "AUTOMATION",
    sublabel: "Tools, Workflows, Integrations",
    headline: "AI Workflows that run themselves",
    description:
      "Webhooks in, smart actions out. Connect tools, process documents, summarize content, route requests — all without you in the loop.",
    tags: ["n8n", "Zapier", "Webhooks"],
    href: "/demos/automation",
    icon: Workflow,
  },
  {
    slug: "mvp",
    eyebrow: "MVP APP",
    sublabel: "Full Product, Auth + Database + AI",
    headline: "Full-stack apps with AI built in",
    description:
      "Auth, database, dashboard, and a real AI feature at the core. Ideas to launched product in days, not months.",
    tags: ["Next.js", "Supabase", "Stripe"],
    href: "/demos/mvp",
    icon: Rocket,
  },
] as const;

const CARD_DELAYS = [0.1, 0.25, 0.4] as const;

export function Services() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20 sm:px-10 md:pt-16 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: EASE_OUT_QUINT }}
        className="mb-12 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          What I Build
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Three services. One developer.
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Pick what fits. Or combine them.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {services.map((service, idx) => (
          <ServiceCard
            key={service.slug}
            eyebrow={service.eyebrow}
            sublabel={service.sublabel}
            headline={service.headline}
            description={service.description}
            href={service.href}
            icon={service.icon}
            tags={service.tags}
            delay={CARD_DELAYS[idx]}
          />
        ))}
      </div>
    </section>
  );
}
