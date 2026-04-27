"use client";

import { useRef, type ComponentType } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Code, FileText, Phone, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

type LucideIconLike = ComponentType<{ className?: string }>;

interface Step {
  icon: LucideIconLike;
  title: string;
  description: string;
}

/** Process steps per DECISION #69 — discovery → handover. */
const STEPS: readonly Step[] = [
  {
    icon: Phone,
    title: "Discovery Call",
    description:
      "We talk about your idea, your audience, and what success looks like. Free, no commitment.",
  },
  {
    icon: Sparkles,
    title: "Custom Demo",
    description:
      "I build a small working demo with your specific use case. You see real progress before you sign anything.",
  },
  {
    icon: FileText,
    title: "Proposal & Kickoff",
    description:
      "Clear scope, fixed timeline, transparent pricing. Once you say go, we kick off the build immediately.",
  },
  {
    icon: Code,
    title: "Build & Iterate",
    description:
      "Weekly progress updates. You review, give feedback, I adjust. No surprises at the end.",
  },
  {
    icon: Rocket,
    title: "Launch & Handover",
    description:
      "Deploy to your accounts, full handover docs, support window included. Your project, your stack, your IP.",
  },
] as const;

/**
 * Snake path connecting five icons in a 1000×1000 viewBox. Path Y values
 * are spaced (0, 200, 400, 600, 800) to roughly match where icons land
 * when the five step blocks have similar heights — the path ends slightly
 * short of the container's bottom because step 5 has its description
 * below the icon. preserveAspectRatio="none" stretches X/Y independently.
 *
 * Horizontal alternates 30%↔70% across endpoints (300 ↔ 700 in viewBox).
 * Cubic Bezier control points sit at the midpoint Y of each segment so
 * the curves form a smooth S between every pair of icons.
 */
const SNAKE_PATH =
  "M 300 0 C 300 100, 700 100, 700 200 C 700 300, 300 300, 300 400 C 300 500, 700 500, 700 600 C 700 700, 300 700, 300 800";

/**
 * "How I work" section. Five steps anchored on a flow line.
 *
 * Desktop (≥lg): a SVG snake path connects icons that alternate at 30%
 * and 70% horizontal. Each step's content sits on the wide side opposite
 * its icon (icon at 30% → content fills right; icon at 70% → content
 * fills left). Path's pathLength animates 0→1 as the user scrolls the
 * section through the viewport.
 *
 * Mobile/tablet (<lg): a straight vertical line at left-4 (since a snake
 * doesn't fit a 375px viewport sensibly). Same 0→1 progress via scaleY
 * on a violet overlay <div>.
 *
 * Reduced-motion: line/path renders fully drawn at first paint.
 *
 * Background shapes: three very-blurred violet circles (4%/3%/3% alpha)
 * sit absolutely behind the section content for depth. `overflow-hidden`
 * on the section keeps them from bleeding into the page edges.
 */
export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Decorative background shapes — kept very subtle (3-4% alpha)
          so they read as ambient depth, not as decoration. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-accent-brand/[0.04] blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent-brand/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-accent-brand/[0.03] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 max-w-2xl text-center md:mb-24"
        >
          <motion.p
            variants={childVariant}
            className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            How I Work
          </motion.p>
          <motion.h2
            variants={childVariant}
            className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            From first call to live launch.
          </motion.h2>
          <motion.p
            variants={childVariant}
            className="mt-6 text-lg text-muted-foreground"
          >
            A clear process — no surprises, no scope-creep, no vendor-lock.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Mobile/tablet: straight vertical line at left-4 (2 stacked
              divs — grey track + animated violet overlay). */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 w-px bg-border lg:hidden"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: shouldReduce ? 1 : progress }}
            className="absolute top-0 left-4 h-full w-px origin-top bg-accent-brand lg:hidden"
          />

          {/* Desktop: SVG snake path. preserveAspectRatio="none" lets the
              path stretch with the container; pathLength drives the
              violet draw-in. */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              d={SNAKE_PATH}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
              className="text-border"
            />
            <motion.path
              d={SNAKE_PATH}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: shouldReduce ? 1 : progress }}
              className="text-accent-brand"
            />
          </svg>

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, index) => (
              <StepRow
                key={step.title}
                step={step}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({ step, isEven }: { step: Step; isEven: boolean }) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedReveal : reveal;
  const Icon = step.icon;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-150px" }}
      className="relative"
    >
      {/*
       * Icon circle:
       * - Mobile (<lg): sits on the left line (left-4).
       * - Desktop (≥lg): sits on the snake — even-index at 30%, odd
       *   at 70%. The pair of `lg:left-[30%]` / `lg:left-[70%]` classes
       *   are static literals so Tailwind's compiler picks both up.
       */}
      <div
        className={cn(
          "absolute top-0 left-4 z-10 -translate-x-1/2",
          isEven ? "lg:left-[30%]" : "lg:left-[70%]",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>

      {/*
       * Content sits on the WIDE side opposite the icon. With icons at
       * 30%/70%, the wide side is 70% of the container. text-left when
       * content fills from left edge of the icon, text-right when it
       * ends at the icon. Mobile keeps everything to the right of the
       * line (ml-16, text-left).
       */}
      <div
        className={cn(
          "ml-16 lg:ml-0",
          isEven
            ? "lg:pl-[35%] lg:text-left"
            : "lg:pr-[35%] lg:text-right",
        )}
      >
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
