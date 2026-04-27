"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

/**
 * Final CTA — closes the page with two conversion routes: View Demos
 * (primary, internal) and Visit Fiverr (outline, external).
 *
 * Buttons use Link + buttonVariants() rather than <Button asChild>
 * because this project's shadcn Button is on Base UI primitives, not
 * Radix Slot — same pattern as the Hero CTA.
 */
export function FinalCTA() {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  return (
    <section className="relative py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={childVariant}
            className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Ready to ship something?
          </motion.h2>

          <motion.p
            variants={childVariant}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Pick a service that fits, or message me with your specific use
            case. Free discovery call, no commitment.
          </motion.p>

          <motion.div
            variants={childVariant}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
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

            <a
              href="https://fiverr.com/ibwayi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr profile (opens in new tab)"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 gap-2 px-6 text-base transition-transform hover:scale-[1.02]",
              )}
            >
              Visit Fiverr
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
