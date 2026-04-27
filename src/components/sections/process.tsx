"use client";

import { useRef, type ComponentType } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
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
 * Single combined path with M jumps between subpaths so pathLength on
 * the violet path animates a continuous "drawing" through all four
 * connectors in order. viewBox is 100×100 (% units) and
 * preserveAspectRatio="none" stretches with the wrapper.
 *
 * Connector segments:
 *   1 → 2   horizontal across the col-gap at row-1 middle
 *   2 → 3   right-angle: down out of card 2, left across, down into card 3
 *   3 → 4   horizontal across the col-gap at row-2 middle
 *   4 → 5   right-angle: down out of card 4, left to centerline, down into card 5
 *
 * Coordinate values are approximations of the card edges/middles in
 * percent — close enough when card heights are similar; easy to tune
 * if the live render shows the connectors landing off-edge.
 */
const FLOW_PATH =
  "M 48 15 H 52 M 76 30 V 40 H 48 V 50 M 48 50 H 52 M 76 65 V 72 H 50 V 80";

/**
 * "How I work" section — 2×2 grid + a centered 5th highlight card.
 *
 * Step flow (Z): Card 1 (top-left) → Card 2 (top-right) → Card 3 (mid-left)
 * → Card 4 (mid-right) → Card 5 (centered, highlighted, bigger). Right-
 * angle SVG flow lines connect adjacent cards on desktop. Mobile/tablet
 * stacks all five with a vertical line on the left.
 *
 * Card 5 is the "success moment": accent-brand border, accent-brand icon,
 * and a continuous animate-glow-pulse (3s violet bloom on top of the
 * regular drop-shadow). Reduced-motion: pulse pinned to the mid-frame
 * via the global @media rule clamping animation-duration.
 */
export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center md:mb-20"
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
          {/* Desktop layout: 2×2 grid + centered card 5 + SVG flow lines. */}
          <div className="relative hidden lg:block">
            <div className="mb-12 grid grid-cols-2 gap-x-12 gap-y-12">
              <StepCard step={STEPS[0]} index={0} />
              <StepCard step={STEPS[1]} index={1} />
              <StepCard step={STEPS[2]} index={2} />
              <StepCard step={STEPS[3]} index={3} />
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <StepCard step={STEPS[4]} index={4} isHighlight />
              </div>
            </div>

            <DesktopFlowLines
              lineProgress={lineProgress}
              shouldReduce={shouldReduce}
            />
          </div>

          {/* Mobile/tablet layout: stacked cards with vertical line. */}
          <div className="relative space-y-8 lg:hidden">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-4 w-px bg-border"
            />
            <motion.div
              aria-hidden
              style={{ scaleY: shouldReduce ? 1 : lineProgress }}
              className="absolute top-0 left-4 h-full w-px origin-top bg-accent-brand"
            />
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative pl-12">
                <StepCard step={step} index={index} isHighlight={index === 4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopFlowLines({
  lineProgress,
  shouldReduce,
}: {
  lineProgress: MotionValue<number>;
  shouldReduce: boolean | null;
}) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={FLOW_PATH}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="text-border"
      />
      <motion.path
        d={FLOW_PATH}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: shouldReduce ? 1 : lineProgress }}
        className="text-accent-brand"
      />
    </svg>
  );
}

interface StepCardProps {
  step: Step;
  index: number;
  isHighlight?: boolean;
}

function StepCard({ step, index, isHighlight = false }: StepCardProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedReveal : reveal;
  const Icon = step.icon;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      className="relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8",
          // Highlight card: accent border + animated violet glow (replaces
          // the plain shadow-lg). Non-highlight cards keep shadow-lg.
          isHighlight
            ? "border-accent-brand/40 animate-glow-pulse"
            : "border-border shadow-lg",
        )}
      >
        {/* Watermark step-number — same as the previous followup. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 -right-4 select-none"
        >
          <span className="font-display text-[140px] font-bold leading-none tracking-tight text-foreground/[0.04] md:text-[180px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative z-10">
          <div
            className={cn(
              "mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background",
              isHighlight ? "border-accent-brand" : "border-border",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                isHighlight ? "text-accent-brand" : "text-foreground",
              )}
            />
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
