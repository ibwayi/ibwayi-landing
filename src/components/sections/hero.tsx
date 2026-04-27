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
import { HeroMockup } from "@/components/hero-mockup";

/**
 * Two-column hero. At ≥lg: tricolon left-aligned + mockup right. At <lg:
 * stacked, text first then mockup. Section is sized via padding rather
 * than min-height so the next section (Services) lands naturally below.
 *
 * Animation choreography (chronark-style, ~1.2s total):
 * - Grid container drives a stagger across all four reveal children.
 * - h1 (tricolon) reveals as one block — the line-by-line stagger that
 *   was here before the redesign read as too busy next to the mockup.
 * - The Live badge has its own delayed reveal in HeroMockup.
 *
 * Reduced-motion: snap to compact end state, no transforms.
 */
export function Hero() {
  const shouldReduce = useReducedMotion();
  const childVariant = shouldReduce ? reducedReveal : reveal;
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left column — tricolon + subline + CTA */}
          <div className="flex flex-col items-start text-left">
            <motion.h1
              variants={childVariant}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              <span className="block">Custom AI.</span>
              <span className="block">Done right.</span>
              <span className="block">Shipped fast.</span>
            </motion.h1>

            <motion.p
              variants={childVariant}
              className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
            >
              Chatbots, automations, and MVP web apps. From concept to launch.
            </motion.p>

            <motion.div variants={childVariant} className="mt-8">
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

          {/* Right column — mockup */}
          <motion.div variants={childVariant} className="relative">
            <HeroMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
