"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  reducedReveal,
  reducedStagger,
  reveal,
  revealStagger,
} from "@/lib/animations";

export interface DemoPageData {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  useCases: { title: string; description: string }[];
  whatYouGet: string[];
  techStack: { name: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubline: string;
}

interface DemoPageTemplateProps {
  data: DemoPageData;
}

/**
 * Shared marketing-page template for /demos/<slug>. Each service-specific
 * page imports its content from src/content/demos/<slug>.ts and renders
 * via this component. Sections (top-down):
 *
 *   1. Hero (eyebrow + title + subtitle + description)
 *   2. Demo slot — "Live demo coming soon" placeholder, will be filled
 *      by 7.5e with the real interactive component for each service.
 *   3. Use cases
 *   4. What you get (checklist)
 *   5. Tech stack
 *   6. Process
 *   7. FAQ (native <details>/summary)
 *   8. CTA
 */
export function DemoPageTemplate({ data }: DemoPageTemplateProps) {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  return (
    <main className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-4xl space-y-20 px-4 sm:px-6 md:space-y-28 lg:px-8">
        {/* 1. Hero */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={childVariant}
            className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            {data.eyebrow}
          </motion.p>
          <motion.h1
            variants={childVariant}
            className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {data.title}
          </motion.h1>
          <motion.p
            variants={childVariant}
            className="mb-4 text-xl text-muted-foreground"
          >
            {data.subtitle}
          </motion.p>
          <motion.p
            variants={childVariant}
            className="text-lg leading-relaxed text-foreground/90"
          >
            {data.description}
          </motion.p>
        </motion.section>

        {/* 2. Demo slot — replaced in 7.5e by real interactive demos */}
        <motion.section
          variants={childVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Live Demo
            </p>
            <p className="mb-2 font-display text-2xl font-semibold text-foreground">
              Interactive demo coming soon
            </p>
            <p className="mx-auto max-w-md text-muted-foreground">
              Want a hands-on preview? Get in touch — happy to walk you
              through a live example.
            </p>
          </div>
        </motion.section>

        {/* 3. Use cases */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={childVariant}
            className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Use cases
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.useCases.map((useCase) => (
              <motion.div
                key={useCase.title}
                variants={childVariant}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="mb-2 text-lg font-semibold text-foreground">
                  {useCase.title}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 4. What you get */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={childVariant}
            className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            What you get
          </motion.h2>
          <ul className="space-y-3">
            {data.whatYouGet.map((item) => (
              <motion.li
                key={item}
                variants={childVariant}
                className="flex items-start gap-3"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-brand" />
                <span className="text-foreground/90">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* 5. Tech stack */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={childVariant}
            className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Tech stack
          </motion.h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={childVariant}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="mb-1 font-semibold text-foreground">
                  {tech.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. Process */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={childVariant}
            className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            How it works
          </motion.h2>
          <div className="space-y-6">
            {data.process.map((step) => (
              <motion.div
                key={step.step}
                variants={childVariant}
                className="flex items-start gap-4 md:gap-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background font-display font-bold text-foreground/60">
                  {step.step}
                </div>
                <div>
                  <p className="mb-1 text-lg font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. FAQ */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={childVariant}
            className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            FAQ
          </motion.h2>
          <div className="space-y-4">
            {data.faqs.map((faq) => (
              <motion.details
                key={faq.question}
                variants={childVariant}
                className="group rounded-xl border border-border bg-card p-5 [&[open]_svg]:rotate-180"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                  {faq.question}
                  <svg
                    aria-hidden
                    className="ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </motion.section>

        {/* 8. CTA */}
        <motion.section
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.h2
            variants={childVariant}
            className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {data.ctaHeadline}
          </motion.h2>
          <motion.p
            variants={childVariant}
            className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground"
          >
            {data.ctaSubline}
          </motion.p>
          <motion.div
            variants={childVariant}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <a
              href="https://fiverr.com/ibwayi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr profile (opens in new tab)"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 gap-2 px-6 text-base transition-transform hover:scale-[1.02]",
              )}
            >
              Visit Fiverr
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/demos"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 gap-2 px-6 text-base transition-transform hover:scale-[1.02]",
              )}
            >
              See other services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
