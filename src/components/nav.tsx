"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Custom floating-pill nav. Replaces the Aceternity FloatingNavbar that we
 * used through 7.3a–7.4a — its useScroll-driven hide-on-scroll + opacity
 * animations were repeatedly causing desktop click-reliability issues
 * (cursor flicker, missed first click, nav vanishing on hash navigation).
 *
 * Design rules:
 * - No Framer Motion in the Nav. CSS transitions for hover only.
 * - Outer <header> is pointer-events-none so clicks outside the pill fall
 *   through to the page. Inner <nav> opts back in with pointer-events-auto.
 * - z-50 sits above the body::before stripe pattern (z-0) and the page
 *   content (z-1).
 */

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
  // Hash anchors (e.g. /#about) live on Home — never match as the active route.
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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-border bg-background/80 px-1.5 py-2 shadow-lg shadow-black/20 backdrop-blur-md sm:gap-1 sm:px-2">
        <Link
          href="/"
          className="cursor-pointer rounded-full px-2.5 py-2 text-sm font-bold tracking-tight text-foreground transition-colors hover:text-accent-brand sm:px-3"
        >
          Ibwayi
        </Link>

        <div aria-hidden className="mx-0.5 h-5 w-px bg-border sm:mx-1" />

        {ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            active={isActive(pathname, item.href)}
          >
            {item.label}
          </NavItem>
        ))}

        <div aria-hidden className="mx-0.5 h-5 w-px bg-border sm:mx-1" />

        <ThemeToggle />

        <a
          href="https://fiverr.com/ibwayi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fiverr profile (opens in new tab)"
          className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4"
        >
          <span>Fiverr</span>
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </nav>
    </header>
  );
}
