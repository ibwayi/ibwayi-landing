"use client";

import { useRef, type ComponentType } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Code, FileText, Phone, Rocket, Sparkles } from "lucide-react";
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
 * "How I work" section — five vertical cards on a centerline.
 *
 * Layout is identical mobile/desktop: cards stack in a column inside a
 * max-w-3xl container, each card with a 48px icon-circle on the left
 * and title + description on the right. A 1px vertical line sits at
 * left-1/2 of the steps container. Cards are opaque and stack above
 * the line, so the line is only visible in the gaps between cards —
 * which is the desired effect (each gap reads as a connector).
 *
 * On scroll, the violet line draws in via scaleY 0→1 driven by
 * useScroll on the steps container. With prefers-reduced-motion, the
 * violet line is fully drawn at first paint.
 *
 * Replaces the snake-path + zigzag + background-shapes implementation
 * from the previous followup — that was visually noisy and the icon
 * positions never reliably matched the snake's anchor points.
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
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          {/* Permanent grey track at the centerline. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-px bg-border"
          />

          {/* Animated violet progress line — scaleY 0→1 as the section
              scrolls through the viewport. */}
          <motion.div
            aria-hidden
            style={{ scaleY: shouldReduce ? 1 : lineProgress }}
            className="absolute top-0 left-1/2 h-full w-px origin-top -translate-x-px bg-accent-brand"
          />

          {/* Cards — relative so they stack above the line. */}
          <div className="relative space-y-6 md:space-y-8">
            {STEPS.map((step) => (
              <StepCard key={step.title} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedReveal : reveal;
  const Icon = step.icon;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="flex items-start gap-4 md:gap-6">
        <div className="shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
        </div>
        <div className="flex-1 pt-1">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {step.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
