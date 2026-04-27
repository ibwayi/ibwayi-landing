"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  link: string;
  /** Icon shown on mobile in place of the text label. */
  icon?: ReactNode;
  /** External links open in a new tab and use a regular <a>. */
  external?: boolean;
  /** Visual highlight (active route) — set by the wrapper via usePathname. */
  active?: boolean;
}

interface FloatingNavProps {
  navItems: NavItem[];
  /** Wordmark / logo on the left side of the pill. */
  logo?: ReactNode;
  /** Right-side slot — typically Theme-Toggle or a primary CTA button. */
  cta?: ReactNode;
  className?: string;
}

/**
 * Aceternity FloatingNav, adapted for ibwayi-landing.
 *
 * Tweaks vs upstream:
 * - Initial visibility = true (upstream defaults to false, which hides the nav
 *   on first paint until the user has scrolled — wrong for a marketing landing
 *   where the nav is the primary navigation surface).
 * - Always visible above 5% scroll; hides on scroll-down, shows on scroll-up.
 * - `logo` + `cta` slots replace the hardcoded "Login" button.
 * - Supports internal (next/link) + external links via `navItem.external`.
 * - Active-state styling driven by the wrapper component (usePathname there).
 * - JSX.Element → ReactNode for forward-compat with React 19 / Next 16.
 */
export function FloatingNav({ navItems, logo, cta, className }: FloatingNavProps) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;

    // Don't run hide-on-scroll on pages that aren't actually scrollable.
    // Without this, scrollYProgress can flicker on mount (0 → tiny value)
    // and the direction-detection logic flashes the nav to hidden even
    // though the user never scrolled.
    if (typeof document !== "undefined") {
      const scrollable =
        document.documentElement.scrollHeight > window.innerHeight + 1;
      if (!scrollable) {
        setVisible(true);
        return;
      }
    }

    const previous = scrollYProgress.getPrevious() ?? current;
    const direction = current - previous;

    if (current < 0.05) {
      // Top of the page — always show.
      setVisible(true);
    } else if (direction < 0) {
      // Scrolling up — show.
      setVisible(true);
    } else {
      // Scrolling down — hide.
      setVisible(false);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-4 z-50 mx-auto flex max-w-fit items-center justify-center px-4 sm:top-6",
          className,
        )}
      >
        <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md">
          {logo && (
            <>
              <Link
                href="/"
                className="rounded-full px-3 py-1 text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary"
              >
                {logo}
              </Link>
              <div className="mx-1 h-5 w-px bg-border" />
            </>
          )}

          <div className="flex items-center gap-1">
            {navItems.map((item, idx) => {
              const baseClasses = cn(
                "relative flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors sm:px-4 sm:py-1.5",
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              );
              const content = (
                <>
                  {item.icon && (
                    <span aria-hidden className="block sm:hidden">
                      {item.icon}
                    </span>
                  )}
                  <span className="hidden sm:block">{item.name}</span>
                  {item.active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px bg-primary"
                    />
                  )}
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={`nav-${idx}`}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseClasses}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={`nav-${idx}`} href={item.link} className={baseClasses}>
                  {content}
                </Link>
              );
            })}
          </div>

          {cta && (
            <>
              <div className="mx-1 h-5 w-px bg-border" />
              <div className="flex items-center px-1">{cta}</div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
