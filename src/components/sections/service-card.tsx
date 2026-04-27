"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  label: string;
  headline: string;
  description: string;
  href: string;
  icon: LucideIcon;
  delay?: number;
}

/**
 * Single service card. Whole card is one Link so the hit area covers
 * everything; hover state lifts + shifts border + glow + nudges the
 * "View Demo" arrow. Entry animation lives on the motion.div wrapper —
 * Tailwind owns the hover transitions so we don't fight Framer Motion
 * over transform values.
 */
export function ServiceCard({
  label,
  headline,
  description,
  href,
  icon: Icon,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
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
          {label}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {headline}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-end gap-1.5 pt-8 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
          <span>View Demo</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
