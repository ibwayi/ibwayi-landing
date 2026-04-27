"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Floating-pill nav. Two layouts share the same pill:
 *
 * - Desktop (≥ sm): scroll-driven transformation. At scrollY=0, big
 *   56px avatar + "Ibwayi" wordmark + Home/Demos/About + ThemeToggle +
 *   Fiverr. After ~100px scroll, avatar shrinks to 32, wordmark fades,
 *   pill padding+gap tighten.
 * - Mobile (< sm): vereinfachte Pill — Avatar(32) + ThemeToggle +
 *   Burger. Tap on burger opens a slide-in Sheet from the right with
 *   Home / Demos / About / Fiverr. Pill padding/gap pinned to compact
 *   end-state so the pill fits 375px viewport.
 *
 * Layout split is done via Tailwind responsive classes (`hidden sm:*`
 * / `sm:hidden`), not via JS branching. The motion-driven inline styles
 * apply to elements regardless of viewport — but those elements are
 * either visible (desktop) or removed via `display: none` (mobile),
 * so SSR is stable and no flash occurs on either side.
 *
 * Anti-flake guards:
 * - Per-item hit-box (px-2.5 py-2 sm:px-4) is NOT animated. Only the
 *   pill wrapper padding and gap animate (desktop only).
 * - All transforms deterministic via scrollY/useTransform.
 * - prefers-reduced-motion: snap to compact end-state, no transforms.
 */

const TRANSITION_END = 100;

type NavItemDef = { href: string; label: string };

const ITEMS: readonly NavItemDef[] = [
  { href: "/", label: "Home" },
  { href: "/demos", label: "Demos" },
  { href: "/#about", label: "About" },
] as const;

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  if (href === "/demos") return pathname === "/demos" || pathname.startsWith("/demos/");
  return false;
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative cursor-pointer rounded-full px-2.5 py-2 text-sm font-medium transition-colors sm:px-4",
        active
          ? "text-accent-brand"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
      {active && (
        <span
          aria-hidden
          className="absolute -bottom-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-accent-brand"
        />
      )}
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");

  const { scrollY } = useScroll();

  const avatarSizeMV = useTransform(scrollY, [0, TRANSITION_END], [56, 32]);
  const wordmarkOpacityMV = useTransform(
    scrollY,
    [0, TRANSITION_END * 0.5],
    [1, 0],
  );
  const wordmarkWidthMV = useTransform(
    scrollY,
    [0, TRANSITION_END * 0.7],
    [88, 0],
  );
  const navPaddingYMV = useTransform(scrollY, [0, TRANSITION_END], [12, 6]);
  const navPaddingXMV = useTransform(scrollY, [0, TRANSITION_END], [16, 6]);
  const navGapMV = useTransform(scrollY, [0, TRANSITION_END], [12, 2]);

  // On mobile or with reduced-motion, snap everything to the compact
  // end-state. Same numbers reduced-motion uses, so the design system
  // stays consistent across both bypass paths.
  const fixedAvatar = shouldReduce || isMobile;
  const fixedWordmark = shouldReduce || isMobile;
  const fixedPill = shouldReduce || isMobile;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6 sm:px-6">
      <motion.nav
        style={{
          paddingTop: fixedPill ? 6 : navPaddingYMV,
          paddingBottom: fixedPill ? 6 : navPaddingYMV,
          paddingLeft: fixedPill ? 6 : navPaddingXMV,
          paddingRight: fixedPill ? 6 : navPaddingXMV,
          gap: fixedPill ? 2 : navGapMV,
        }}
        className="pointer-events-auto flex items-center rounded-full border border-border bg-background/80 shadow-lg shadow-black/20 backdrop-blur-md"
      >
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2 rounded-full px-1 py-0.5 transition-colors hover:bg-muted"
          aria-label="Home — Ibwayi"
        >
          <motion.div
            style={{
              width: fixedAvatar ? 32 : avatarSizeMV,
              height: fixedAvatar ? 32 : avatarSizeMV,
            }}
            className="shrink-0"
          >
            <Avatar size="lg" className="h-full w-full text-base" />
          </motion.div>

          <motion.span
            aria-hidden={fixedWordmark}
            style={{
              opacity: fixedWordmark ? 0 : wordmarkOpacityMV,
              width: fixedWordmark ? 0 : wordmarkWidthMV,
            }}
            className="hidden overflow-hidden whitespace-nowrap font-display text-base font-bold tracking-tight text-foreground sm:inline-flex"
          >
            Ibwayi
          </motion.span>
        </Link>

        {/* Desktop-only block: separators + nav items */}
        <motion.div
          className="hidden items-center sm:flex"
          style={{ gap: shouldReduce ? 2 : navGapMV }}
        >
          <div aria-hidden className="mx-0.5 h-5 w-px shrink-0 bg-border sm:mx-1" />
          {ITEMS.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              active={isActive(pathname, item.href)}
            >
              {item.label}
            </NavItem>
          ))}
          <div aria-hidden className="mx-0.5 h-5 w-px shrink-0 bg-border sm:mx-1" />
        </motion.div>

        <ThemeToggle />

        {/* Desktop-only Fiverr link */}
        <a
          href="https://fiverr.com/ibwayi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fiverr profile (opens in new tab)"
          className="hidden shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex sm:px-4"
        >
          <span>Fiverr</span>
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>

        {/* Mobile-only burger menu */}
        <div className="sm:hidden">
          <MobileMenu />
        </div>
      </motion.nav>
    </header>
  );
}
