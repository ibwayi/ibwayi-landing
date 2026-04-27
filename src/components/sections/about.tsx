"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

/**
 * About section — placeholder photo + 3-paragraph intro. Section anchor
 * is `#about` so the floating-nav "About" link can hash-link to it.
 *
 * To replace the placeholder photo with the real one:
 * 1. Add image to /public/about-photo.jpg (recommended 320×320, square,
 *    optimised webp/jpg).
 * 2. Replace the inner placeholder <div>I</div> block with:
 *    <Image src="/about-photo.jpg" width={160} height={160}
 *           className="h-full w-full rounded-2xl object-cover"
 *           alt="Ibwayi" />
 * 3. Drop the bg-muted/border classes from the wrapper if the image
 *    fills the frame; keep the `rounded-2xl` so corners stay clipped.
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
            className="mb-8 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Hi, I&rsquo;m Ibwayi.
          </motion.h2>

          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
            <motion.div variants={childVariant} className="shrink-0">
              <div className="flex h-32 w-32 select-none items-center justify-center rounded-2xl border border-border bg-muted font-display text-5xl font-bold text-foreground/40 md:h-40 md:w-40">
                I
              </div>
            </motion.div>

            <motion.div variants={childVariant} className="space-y-4">
              <p className="text-lg leading-relaxed text-foreground/90">
                I&rsquo;m an AI developer based in Cologne, Germany. I build
                practical AI solutions for businesses — chatbots that handle
                real customer questions, automations that save hours of manual
                work, and MVP web apps that get founders from idea to launch.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                Before AI, I worked on backend systems and integrations for
                SaaS companies. That foundation matters: AI is only as good as
                the systems it plugs into.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                Every project ends with you owning everything — your code,
                your accounts, your IP. No black boxes, no vendor-lock.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
