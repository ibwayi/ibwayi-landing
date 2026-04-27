"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Landing-page hero. Three-line tricolon headline + supporting subline +
 * single primary CTA. Vertically centered in the available viewport
 * (100svh minus the layout's 6rem top-padding for the floating nav).
 */
export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-6rem)] w-full flex-col items-center justify-center px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl xl:text-8xl"
        >
          <span className="block">Custom AI.</span>
          <span className="block">Done right.</span>
          <span className="block">Shipped fast.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Chatbots, automations, and MVP web apps — from concept to launch.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="mt-12 inline-flex"
        >
          <Link
            href="/demos"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 gap-2 px-6 text-base",
            )}
          >
            View Demos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
