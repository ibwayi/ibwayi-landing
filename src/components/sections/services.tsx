"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, Rocket, Workflow } from "lucide-react";
import { ServiceCard } from "@/components/sections/service-card";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

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

export function Services() {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariant}
      className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20 sm:px-10 md:pt-16 md:pb-28"
    >
      <motion.div variants={childVariant} className="mb-12 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          What I Build
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Three services. One developer.
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Pick what fits. Or combine them.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            eyebrow={service.eyebrow}
            sublabel={service.sublabel}
            headline={service.headline}
            description={service.description}
            href={service.href}
            icon={service.icon}
            tags={service.tags}
          />
        ))}
      </div>
    </motion.section>
  );
}
