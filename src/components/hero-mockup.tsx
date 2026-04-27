"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * HeroMockup — placeholder browser frame with abstract dashboard skeleton.
 *
 * To replace with a real screenshot:
 * 1. Add image to /public/hero-mockup.png (recommended 1200×800, dark theme)
 * 2. Replace the inner Browser-Content div's children with:
 *    <Image src="/hero-mockup.png" width={1200} height={800} alt="..."
 *           className="block w-full h-auto" />
 * 3. Remove the skeleton blocks (Header, Stats-Row, Content-Lines, Mock-Card)
 * 4. Keep the Browser-Frame wrapper, the violet Glow underneath, and the
 *    Floating "Live" badge decoration.
 */
export function HeroMockup() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Subtle violet glow behind the mockup */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-accent-brand/30 via-transparent to-accent-brand/20" />
      </div>

      {/* Browser frame */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Browser toolbar — Mac-style traffic lights + URL bar placeholder */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <div className="mx-4 flex-1">
            <div className="mx-auto h-6 max-w-xs rounded-md bg-background/60" />
          </div>
          <div className="w-12" />
        </div>

        {/* Browser content — abstract SaaS dashboard skeleton */}
        <div className="min-h-[280px] space-y-4 p-6 md:min-h-[360px]">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-foreground/10" />
              <div className="h-3 w-48 rounded bg-foreground/5" />
            </div>
            <div className="h-9 w-24 rounded-lg bg-accent-brand/20" />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-2 rounded-lg border border-border p-3"
              >
                <div className="h-2 w-12 rounded bg-foreground/5" />
                <div className="h-5 w-16 rounded bg-foreground/15" />
              </div>
            ))}
          </div>

          {/* Body content lines */}
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full rounded bg-foreground/5" />
            <div className="h-3 w-5/6 rounded bg-foreground/5" />
            <div className="h-3 w-4/6 rounded bg-foreground/5" />
          </div>

          {/* Mock card */}
          <div className="mt-4 space-y-2 rounded-lg border border-border bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent-brand/30" />
              <div className="space-y-1">
                <div className="h-3 w-20 rounded bg-foreground/10" />
                <div className="h-2 w-16 rounded bg-foreground/5" />
              </div>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="h-2 w-full rounded bg-foreground/5" />
              <div className="h-2 w-3/4 rounded bg-foreground/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating "Live" badge — desktop only, since the column layout
          collapses to single-column at <lg and the badge would clash. */}
      <motion.div
        aria-hidden
        className="absolute -top-4 -right-4 hidden lg:block"
        initial={shouldReduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 shadow-xl backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-foreground">Live</span>
        </div>
      </motion.div>
    </div>
  );
}
