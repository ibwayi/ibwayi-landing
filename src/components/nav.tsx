import Link from "next/link";

/**
 * Skeleton header — replaced in 7.3 with floating-pill nav (Aceternity-style).
 * Not yet mounted in layout.tsx.
 */
export function Nav() {
  return (
    <header className="w-full border-b border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          ibwayi
        </Link>
        <a
          href="https://fiverr.com/ibwayi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Fiverr →
        </a>
      </div>
    </header>
  );
}
