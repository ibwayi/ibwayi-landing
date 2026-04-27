"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

/**
 * Landing-page hero. Three-line tricolon headline + supporting subline +
 * single primary CTA. Sized via vertical padding (not min-h) so the
 * section hands off naturally to the Services section below.
 *
 * Animation: parent runs the stagger, every child uses the same `reveal`
 * variant. Each tricolon line is its own motion.span so they animate
 * line-by-line (chronark pattern). Falls back to a plain opacity fade
 * when prefers-reduced-motion is set.
 */
export function Hero() {
  const shouldReduce = useReducedMotion();
  const childVariant = shouldReduce ? reducedReveal : reveal;
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      className="w-full px-6 pt-24 pb-12 sm:px-10 md:pt-32 md:pb-16 lg:pt-40"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          <motion.span variants={childVariant} className="block">
            Custom AI.
          </motion.span>
          <motion.span variants={childVariant} className="block">
            Done right.
          </motion.span>
          <motion.span variants={childVariant} className="block">
            Shipped fast.
          </motion.span>
        </h1>

        <motion.p
          variants={childVariant}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Chatbots, automations, and MVP web apps. From concept to launch.
        </motion.p>

        <motion.div variants={childVariant} className="mt-8 inline-flex">
          <Link
            href="/demos"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 gap-2 px-6 text-base transition-transform hover:scale-[1.02]",
            )}
          >
            View Demos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
