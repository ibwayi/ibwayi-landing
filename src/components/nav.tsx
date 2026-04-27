"use client";

import { usePathname } from "next/navigation";
import { Compass, Home, User } from "lucide-react";
import { FloatingNav, type NavItem } from "@/components/aceternity/floating-navbar";
import { ThemeToggle } from "@/components/theme-toggle";

const ICON_CLASS = "h-4 w-4";

/**
 * App-level nav. Wraps the Aceternity FloatingNav primitive with our items,
 * active-state detection (usePathname), and the Theme-Toggle + Fiverr CTA.
 */
export function Nav() {
  const pathname = usePathname();

  const items: NavItem[] = [
    {
      name: "Home",
      link: "/",
      icon: <Home className={ICON_CLASS} />,
      active: pathname === "/",
    },
    {
      name: "Demos",
      link: "/demos",
      icon: <Compass className={ICON_CLASS} />,
      active: pathname?.startsWith("/demos") ?? false,
    },
    {
      name: "About",
      link: "/#about",
      icon: <User className={ICON_CLASS} />,
      // /#about is a hash anchor on Home — never matches as the active route.
    },
  ];

  return (
    <FloatingNav
      logo="ibwayi"
      navItems={items}
      cta={
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="https://fiverr.com/ibwayi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span>Fiverr</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      }
    />
  );
}
