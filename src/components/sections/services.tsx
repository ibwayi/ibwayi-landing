"use client";

import { motion } from "motion/react";
import { MessageSquare, Rocket, Workflow } from "lucide-react";
import { ServiceCard } from "@/components/sections/service-card";

/**
 * Order is locked per DECISION #64: Chatbot → Automation → MVP.
 * Pricing intentionally not shown (DECISION #62).
 */
const services = [
  {
    slug: "chatbot",
    label: "Chatbot",
    headline: "Custom AI Chatbots",
    description:
      "FAQ bots, lead-qualification, business assistants. Trained on your data, embedded in your site.",
    href: "/demos/chatbot",
    icon: MessageSquare,
  },
  {
    slug: "automation",
    label: "Automation",
    headline: "AI Automations",
    description:
      "Webhook-driven workflows that connect tools, process data, and trigger AI when you need it.",
    href: "/demos/automation",
    icon: Workflow,
  },
  {
    slug: "mvp",
    label: "MVP App",
    headline: "AI-Powered MVPs",
    description:
      "Full-stack web apps with auth, database, and an AI feature at the core. From concept to launch.",
    href: "/demos/mvp",
    icon: Rocket,
  },
] as const;

export function Services() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
            label={service.label}
            headline={service.headline}
            description={service.description}
            href={service.href}
            icon={service.icon}
            delay={0.1 * (idx + 1)}
          />
        ))}
      </div>
    </section>
  );
}
