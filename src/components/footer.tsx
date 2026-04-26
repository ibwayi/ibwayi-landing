/**
 * Skeleton footer — content + layout filled in 7.3.
 * Not yet mounted in layout.tsx.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} ibwayi</span>
        <span>Powered by Next.js + Vercel</span>
      </div>
    </footer>
  );
}
