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
 * /about — full About page. Was a section on Home through 7.4f; split
 * into its own route in 7.5d so the Home page keeps a compact teaser
 * and About has room to breathe (4 H2-sections, full bio + CTA block).
 *
 * Photo placeholder swap: same recipe as the Home teaser — drop
 * /public/about-photo.jpg, replace the inner <div>I</div> with
 * <Image src="/about-photo.jpg" fill className="rounded-2xl object-cover" alt="Ibwayi" />.
 */
export default function AboutPage() {
  const shouldReduce = useReducedMotion();
  const containerVariant = shouldReduce ? reducedStagger : revealStagger;
  const childVariant = shouldReduce ? reducedReveal : reveal;

  return (
    <main className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={childVariant}
            className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            About
          </motion.p>

          <motion.h1
            variants={childVariant}
            className="mb-8 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Hi, I&rsquo;m Ibwayi.
          </motion.h1>

          <div className="mb-12 flex flex-col items-start gap-8 md:flex-row md:gap-10">
            <motion.div variants={childVariant} className="shrink-0">
              <div className="flex h-32 w-32 select-none items-center justify-center rounded-2xl border border-border bg-muted font-display text-5xl font-bold text-foreground/40 md:h-40 md:w-40">
                I
              </div>
            </motion.div>

            <motion.div variants={childVariant} className="space-y-4">
              <p className="text-lg leading-relaxed text-foreground/90">
                I&rsquo;m an AI developer based in Cologne, Germany. I build
                practical AI solutions for businesses — chatbots that handle
                real customer questions, automations that save hours of
                manual work, and MVP web apps that get founders from idea to
                launch.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={childVariant}
            className="space-y-6 text-lg leading-relaxed text-foreground/90"
          >
            <h2 className="pt-4 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              How I work
            </h2>

            <p>
              Before AI, I worked on backend systems and integrations for
              SaaS companies. That foundation matters: AI is only as good as
              the systems it plugs into. A chatbot that doesn&rsquo;t connect
              to your real database, a workflow that doesn&rsquo;t trigger in
              the right moments, an MVP that can&rsquo;t scale past 10 users
              — these are integration problems disguised as AI problems.
            </p>

            <p>
              My approach is pragmatic: pick the right tool for the job, ship
              something that works, iterate based on real usage. I won&rsquo;t
              sell you a custom-trained model when an OpenAI API call solves
              it. I won&rsquo;t build a complex automation when a simple
              webhook does the job.
            </p>

            <h2 className="pt-6 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              What you get
            </h2>

            <p>
              Every project ends with you owning everything — your code,
              your accounts, your IP, your deployed app. No black boxes, no
              vendor-lock, no monthly fees that disappear when our work
              together ends. You get full handover documentation, a support
              window for questions after launch, and clean code you (or
              another developer) can extend later.
            </p>

            <p>
              I work with founders, small teams, and agencies who need
              reliable AI implementation without the overhead of an
              in-house team. Most projects ship in 1-6 weeks depending on
              scope. Discovery calls are free — no commitment, just a
              conversation about what you&rsquo;re trying to build.
            </p>

            <h2 className="pt-6 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Tech I use
            </h2>

            <p>
              <strong>AI providers:</strong> OpenAI, Anthropic Claude, Google
              Gemini. I pick based on the task — Claude for nuanced
              reasoning, OpenAI for cost-effective production, Gemini for
              huge context windows.
            </p>

            <p>
              <strong>Web stack:</strong> Next.js, TypeScript, Tailwind,
              shadcn/ui. For databases: Supabase. For payments: Stripe. For
              deployments: Vercel.
            </p>

            <p>
              <strong>Automation:</strong> n8n for self-hosted workflows,
              Zapier when SaaS-only is fine, custom webhooks for everything
              in between.
            </p>
          </motion.div>

          <motion.div
            variants={childVariant}
            className="mt-16 border-t border-border pt-8"
          >
            <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Ready to talk?
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Pick a service that fits, or message me with your specific use
              case. Free discovery call, no commitment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
