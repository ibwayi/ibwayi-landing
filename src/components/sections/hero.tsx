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
 * single primary CTA. Sized via vertical padding (not min-h) so the
 * section hands off naturally to whatever follows (Service-Cards in 7.3c).
 */
export function Hero() {
  return (
    <section className="w-full px-6 pt-24 pb-12 sm:px-10 md:pt-32 md:pb-16 lg:pt-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
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
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Chatbots, automations, and MVP web apps. From concept to launch.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="mt-8 inline-flex"
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
