"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Mobile-only nav drawer. Trigger sits in the pill (next to the
 * ThemeToggle); Sheet content is portaled to body via shadcn's wrapper.
 *
 * Sheet open-state is controlled from outside (via Nav) so the parent
 * can react to it — currently used to fade out the floating pill while
 * the menu is open.
 *
 * The Sheet primitive is built on Base UI dialog (not Radix), so it
 * already has tap-outside-to-close, Escape-to-close, focus trap, and
 * prefers-reduced-motion handling baked in.
 */
export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const pathname = usePathname();

  const close = () => onOpenChange(false);

  function isActive(href: string): boolean {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href === "/demos") return pathname === "/demos" || pathname.startsWith("/demos/");
    return false;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[280px] border-border bg-background sm:w-[320px]"
      >
        {/* Required by Base UI dialog for screen readers. Hidden visually. */}
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation menu
        </SheetDescription>

        <nav className="mt-12 flex flex-col gap-1 px-4">
          <MobileNavItem href="/" active={isActive("/")} onClick={close}>
            Home
          </MobileNavItem>
          <MobileNavItem href="/demos" active={isActive("/demos")} onClick={close}>
            Demos
          </MobileNavItem>
          <MobileNavItem href="/#about" active={false} onClick={close}>
            About
          </MobileNavItem>

          <div aria-hidden className="my-4 h-px bg-border" />

          <a
            href="https://fiverr.com/ibwayi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label="Fiverr profile (opens in new tab)"
            className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>Fiverr</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileNavItem({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-lg px-4 py-3 text-base font-medium transition-colors",
        active
          ? "bg-accent-brand/10 text-accent-brand"
          : "text-foreground hover:bg-muted",
      )}
    >
      {children}
    </Link>
  );
}
