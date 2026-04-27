"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  eyebrow: string;
  sublabel: string;
  headline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tags: readonly string[];
  delay?: number;
}

const EASE_OUT_QUINT = [0.16, 1, 0.3, 1] as const;

/**
 * Single service card. Whole card is one Link (full hit area). Description
 * gets `flex-grow` so the tag row + footer sit at a consistent vertical
 * position across all cards regardless of description length.
 *
 * Hover handled in Tailwind, entry handled in Motion — keeps the two
 * animation systems off the same `transform` channel.
 */
export function ServiceCard({
  eyebrow,
  sublabel,
  headline,
  description,
  href,
  icon: Icon,
  tags,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_QUINT }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_0_50px_-15px_rgba(168,85,247,0.35)] md:p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
          <Icon className="h-6 w-6" />
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{sublabel}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
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

        <div className="mt-6 flex items-center justify-end gap-1.5 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
          <span>View Demo</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
