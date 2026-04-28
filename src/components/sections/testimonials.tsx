"use client";

import { motion, useReducedMotion } from "motion/react";
import { TESTIMONIALS } from "@/content/testimonials";
import { FEATURE_FLAGS } from "@/lib/feature-flags";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

/**
 * Testimonials section. Returns `null` while
 * FEATURE_FLAGS.TESTIMONIALS_VISIBLE is false (no real quotes yet).
 *
 * When the flag flips on, renders a 3-up grid (1-up on mobile) of
 * quote cards. Each card shows the quote + author info with a
 * placeholder initial bubble — swap for real <Image> avatars once
 * /public/testimonials/<slug>.jpg files exist.
 */
export function Testimonials() {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  if (!FEATURE_FLAGS.TESTIMONIALS_VISIBLE) {
    return null;
  }

  return (
    <section className="relative py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
        >
          <motion.p
            variants={childVariant}
            className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Testimonials
          </motion.p>
          <motion.h2
            variants={childVariant}
            className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            What clients say.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.slug}
              variants={childVariant}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <blockquote className="grow text-base leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full border border-border bg-muted text-sm font-bold text-foreground/60">
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {t.author}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
