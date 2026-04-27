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
import { ThemeToggle } from "@/components/theme-toggle";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Custom floating-pill nav with scroll-driven avatar shrink + wordmark fade.
 *
 * - At scrollY = 0 (desktop): big 56px avatar + "Ibwayi" wordmark visible.
 * - After ~100px scroll: avatar shrinks to 32px, wordmark fades + width
 *   collapses to 0, pill padding/gap tighten. End state matches the previous
 *   compact pill from 7.4a-2.
 * - Mobile (<sm): avatar fixed at 32px, wordmark hidden via CSS so SSR is
 *   stable. Scroll transforms still run but visually no avatar size change.
 * - prefers-reduced-motion: snap to compact state, no transforms.
 *
 * Design rules carried from 7.4a-2:
 * - Outer <header> pointer-events-none, inner pill pointer-events-auto.
 * - Hit-box of nav items (px+py) stays constant — only the *wrapper* padding
 *   and gap animate. This is why scroll never shifts where you need to click.
 * - z-50 above stripe (z-0) and main (z-1).
 * - No backdrop-blur in animated frames (it's static on the pill, applied
 *   via Tailwind class — Motion doesn't touch it).
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

  // All raw scroll-driven values — components below pick which to use based
  // on shouldReduce / isMobile.
  const avatarSizeMV = useTransform(scrollY, [0, TRANSITION_END], [56, 32]);
  const wordmarkOpacityMV = useTransform(
    scrollY,
    [0, TRANSITION_END * 0.5],
    [1, 0],
  );
  const wordmarkWidthMV = useTransform(
    scrollY,
    [0, TRANSITION_END * 0.7],
    [88, 0], // approx Geist-bold "Ibwayi" + 12px breathing room
  );
  const navPaddingYMV = useTransform(scrollY, [0, TRANSITION_END], [12, 8]);
  const navPaddingXMV = useTransform(scrollY, [0, TRANSITION_END], [16, 8]);
  const navGapMV = useTransform(scrollY, [0, TRANSITION_END], [12, 4]);

  // Pin to the compact end-state when reduced-motion is on, or (for the
  // avatar/wordmark) when we're on mobile.
  const fixedAvatar = shouldReduce || isMobile;
  const fixedWordmark = shouldReduce || isMobile;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <motion.nav
        style={{
          paddingTop: shouldReduce ? 8 : navPaddingYMV,
          paddingBottom: shouldReduce ? 8 : navPaddingYMV,
          paddingLeft: shouldReduce ? 8 : navPaddingXMV,
          paddingRight: shouldReduce ? 8 : navPaddingXMV,
          gap: shouldReduce ? 4 : navGapMV,
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

          {/*
           * Wordmark is hidden via CSS on mobile (`hidden sm:inline-flex`) so
           * SSR is stable. Motion still drives opacity/width on desktop.
           */}
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

        <ThemeToggle />

        <a
          href="https://fiverr.com/ibwayi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fiverr profile (opens in new tab)"
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4"
        >
          <span>Fiverr</span>
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </motion.nav>
    </header>
  );
}
