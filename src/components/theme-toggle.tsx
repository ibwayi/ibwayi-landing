"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

/**
 * Inline theme toggle (NOT the shadcn dropdown variant). Click flips between
 * light + dark. Uses mounted-state pattern to avoid hydration mismatch — the
 * server can't know the user's preferred theme, so we render an empty placeholder
 * with the same dimensions until the client mounts.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  // Pre-mount placeholder — same size as the actual button so the nav doesn't shift.
  // Mirrors the button's box: p-2 + h-4 w-4 inner = 32×32px.
  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-flex items-center justify-center rounded-full p-2"
      >
        <span className="block h-4 w-4" />
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}
