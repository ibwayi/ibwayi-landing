"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  AutomationMockup,
  ChatbotMockup,
  MvpMockup,
} from "@/components/sections/card-mockups";
import { reducedReveal, reveal } from "@/lib/animations";

type ServiceSlug = "chatbot" | "automation" | "mvp";

interface ServiceCardProps {
  slug: ServiceSlug;
  eyebrow: string;
  sublabel: string;
  headline: string;
  description: string;
  href: string;
  tags: readonly string[];
}

const MOCKUPS: Record<ServiceSlug, () => React.JSX.Element> = {
  chatbot: ChatbotMockup,
  automation: AutomationMockup,
  mvp: MvpMockup,
};

/**
 * Service card. The image-slot at top is now the visual anchor (replaces
 * the old icon-tile, which was redundant once the mockup landed). The
 * Link is the full hit area; description gets `grow` so the tag row +
 * footer link sit at a consistent vertical position across all cards.
 *
 * Reveal animation comes from the parent Services section's stagger;
 * hover ladder is Tailwind so it doesn't fight the reveal transform.
 */
export function ServiceCard({
  slug,
  eyebrow,
  sublabel,
  headline,
  description,
  href,
  tags,
}: ServiceCardProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedReveal : reveal;
  const Mockup = MOCKUPS[slug];

  return (
    <motion.div variants={variants} className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out hover:scale-[1.02] hover:border-accent-brand/30 hover:shadow-[0_0_50px_-15px_var(--accent-brand-glow)]"
      >
        {/* Mockup-Bild (visual anchor) */}
        <div className="relative h-48 md:h-52">
          <Mockup />
        </div>

        {/* Card-Content */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{sublabel}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
            {headline}
          </h3>
          <p className="mt-3 grow text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent-brand">
            <span>View Demo</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
