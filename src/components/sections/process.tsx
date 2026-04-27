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
 * Zigzag path connecting 5 card anchors. Even-index cards (0, 2, 4) sit
 * in the left grid column at viewBox x=350; odd-index (1, 3) at x=650.
 * Y values evenly spaced so each card anchors at 10/30/50/70/90 % of
 * the container height — close enough when card heights are similar.
 *
 * preserveAspectRatio="none" stretches X/Y independently with the
 * container; vectorEffect="non-scaling-stroke" keeps the 2px stroke
 * crisp at any aspect ratio.
 */
const ZIGZAG_PATH = "M 350 100 L 650 300 L 350 500 L 650 700 L 350 900";

/**
 * "How I work" section — five cards in a zigzag at desktop (≥lg),
 * stacked vertically on mobile/tablet. Each card has a giant
 * step-number watermark in the top-right corner at very low opacity
 * (4% by default) for depth without decoration noise.
 *
 * Connecting line:
 * - Desktop: SVG path that diagonals between alternating card columns,
 *   pathLength animating 0→1 as the user scrolls.
 * - Mobile: a plain vertical line at the left edge, scaleY 0→1.
 *
 * Replaces the previous vertical-cards-on-centerline iteration —
 * cards-on-a-line read as too plain. Zigzag + watermark gives the
 * section more weight without leaning on heavy decoration.
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
          {/* Desktop layout: 2-col zigzag grid + SVG zigzag path. */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-x-12 gap-y-20">
              {STEPS.map((step, index) => (
                <StepCard
                  key={step.title}
                  step={step}
                  index={index}
                  colStart={index % 2 === 0 ? 1 : 2}
                />
              ))}
            </div>

            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <path
                d={ZIGZAG_PATH}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                className="text-border"
              />
              <motion.path
                d={ZIGZAG_PATH}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: shouldReduce ? 1 : lineProgress }}
                className="text-accent-brand"
              />
            </svg>
          </div>

          {/* Mobile/tablet layout: stacked cards + vertical line. */}
          <div className="relative lg:hidden">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-4 w-px bg-border"
            />
            <motion.div
              aria-hidden
              style={{ scaleY: shouldReduce ? 1 : lineProgress }}
              className="absolute top-0 left-4 h-full w-px origin-top bg-accent-brand"
            />
            <div className="space-y-8 pl-12">
              {STEPS.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: Step;
  index: number;
  /** Desktop grid placement; ignored at <lg. */
  colStart?: 1 | 2;
}

function StepCard({ step, index, colStart }: StepCardProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedReveal : reveal;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={cn(
        "relative",
        colStart === 1 && "lg:col-start-1",
        colStart === 2 && "lg:col-start-2",
      )}
    >
      <StepCardBody step={step} index={index} />
    </motion.div>
  );
}

function StepCardBody({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
      {/* Watermark step-number — very-low-opacity Geist-bold glyph in
          the top-right. overflow-hidden on the card clips its edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-4 -right-4 select-none"
      >
        <span className="font-display text-[140px] font-bold leading-none tracking-tight text-foreground/[0.04] md:text-[180px]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </div>
  );
}
