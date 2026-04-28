"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

const SERVICES = [
  {
    slug: "chatbot",
    eyebrow: "AI CHATBOT",
    title: "Custom AI Chatbots",
    description:
      "FAQ bots, lead qualifiers, business assistants. Trained on your content, integrated with your tools.",
    tags: ["OpenAI", "Claude", "Gemini"],
  },
  {
    slug: "automation",
    eyebrow: "AI AUTOMATION",
    title: "Webhook-Driven Workflows",
    description:
      "Connect your apps. Trigger AI tasks. Save hours of manual work every week.",
    tags: ["n8n", "Zapier", "Webhooks"],
  },
  {
    slug: "mvp",
    eyebrow: "MVP WEB APP",
    title: "Full-Stack MVPs",
    description:
      "From concept to launch. Auth, database, payments, AI features. Production-ready in weeks.",
    tags: ["Next.js", "Supabase", "Stripe"],
  },
];

export default function DemosHubPage() {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  return (
    <main className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-16 max-w-2xl text-center md:mb-24"
        >
          <motion.p
            variants={childVariant}
            className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Demos
          </motion.p>
          <motion.h1
            variants={childVariant}
            className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            See what&rsquo;s possible.
          </motion.h1>
          <motion.p
            variants={childVariant}
            className="mt-6 text-lg text-muted-foreground"
          >
            Three services. Pick the one that fits, or message me with a custom
            scope.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.slug} variants={childVariant}>
              <Link
                href={`/demos/${service.slug}`}
                className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent-brand/30 hover:shadow-[0_0_50px_-15px_var(--accent-brand-glow)] md:p-8"
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {service.eyebrow}
                </p>
                <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {service.title}
                </h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-accent-brand">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
