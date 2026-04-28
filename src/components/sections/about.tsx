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

/**
 * Compact About teaser on Home — single paragraph + photo bubble +
 * "Read more" link to /about. The full About content lives in the
 * standalone /about page (split in 7.5d so each surface has the
 * right density).
 *
 * Section anchor `id="about"` retained so any older deep-link to
 * `/#about` still scrolls here, even though the Nav now points at /about.
 */
export function About() {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={childVariant}
            className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            About
          </motion.p>

          <motion.h2
            variants={childVariant}
            className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Hi, I&rsquo;m Ibwayi.
          </motion.h2>

          <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
            <motion.div variants={childVariant} className="shrink-0">
              <div className="flex h-24 w-24 select-none items-center justify-center rounded-2xl border border-border bg-muted font-display text-4xl font-bold text-foreground/40 md:h-28 md:w-28">
                I
              </div>
            </motion.div>

            <motion.div variants={childVariant} className="flex-1 space-y-4">
              <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                I&rsquo;m an AI developer based in Cologne, Germany. I build
                practical AI solutions for businesses — chatbots,
                automations, and MVP web apps. Every project ends with you
                owning everything: code, accounts, IP. No vendor-lock.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent-brand hover:underline"
              >
                Read more about Ibwayi
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
