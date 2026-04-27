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
 * "How I work" section. Five steps anchored on a vertical flow line.
 *
 * Desktop (≥lg): zigzag — even-index steps sit left of the centerline
 * (text-right), odd-index right (text-left). The icon circles punch
 * through the line on `left-1/2`.
 *
 * Mobile/tablet (<lg): line on the left edge, content stacked to the
 * right. Always text-left.
 *
 * The flow line is two stacked elements: a permanent grey track and a
 * violet "progress" line that scales 0→1 vertically as the user scrolls
 * the section through the viewport. With `prefers-reduced-motion`, the
 * progress line is static at scaleY=1 from first paint.
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

  // 0 → 1 as the user scrolls the section through the viewport.
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-20 md:py-28 lg:py-32">
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
          {/* Background grey line — permanent track. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 w-px bg-border lg:left-1/2 lg:-translate-x-px"
          />

          {/* Progress violet line — scales 0→1 as user scrolls. */}
          <motion.div
            aria-hidden
            style={{
              scaleY: shouldReduce ? 1 : lineProgress,
            }}
            className="absolute top-0 left-4 h-full w-px origin-top bg-accent-brand lg:left-1/2 lg:-translate-x-px"
          />

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
      {/* Icon circle on the line. */}
      <div className="absolute top-0 left-4 z-10 -translate-x-1/2 lg:left-1/2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>

      {/* Step content. Mobile: always to the right of the line. Desktop:
          even index sits left of centerline (text-right), odd sits right
          of centerline (text-left). The 3rem gutter keeps content off
          the line/icon. */}
      <div
        className={cn(
          "ml-16 lg:ml-0",
          isEven
            ? "lg:pr-[calc(50%+3rem)] lg:text-right"
            : "lg:pl-[calc(50%+3rem)] lg:text-left",
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
