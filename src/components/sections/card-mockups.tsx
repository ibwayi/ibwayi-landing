"use client";

/**
 * Card Mockups — placeholder skeletons for each service card image-slot.
 *
 * To replace with real screenshots:
 * 1. Add images to /public/cards/{chatbot,automation,mvp}.png
 *    (recommended 600×400, dark theme, 3:2 aspect).
 * 2. In each Mockup component, replace the inner `.p-4 space-y-3` block
 *    with: <Image src="/cards/<slug>.png" fill className="object-cover" alt="..." />
 *    The wrapping <div> already has `relative`/`overflow-hidden`/`h-full w-full`.
 * 3. Test desktop + mobile, both themes.
 *
 * The mockups deliberately drop the browser-frame from HeroMockup — the
 * Card itself already provides a frame, so a second one would feel
 * redundant. Skeleton blocks use CSS-vars so they theme-flip cleanly.
 */

function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden border-b border-border bg-muted/20">
      <div className="space-y-3 p-4">{children}</div>
    </div>
  );
}

/** Chat-UI skeleton: bot bubble, user bubble, typing-dots indicator. */
export function ChatbotMockup() {
  return (
    <MockupShell>
      {/* Bot message */}
      <div className="flex items-start gap-2">
        <div className="h-7 w-7 shrink-0 rounded-full bg-accent-brand/30" />
        <div className="max-w-[80%] space-y-1.5 rounded-lg border border-border bg-card px-3 py-2">
          <div className="h-2 w-32 rounded bg-foreground/15" />
          <div className="h-2 w-24 rounded bg-foreground/10" />
        </div>
      </div>

      {/* User message */}
      <div className="flex items-start justify-end gap-2">
        <div className="max-w-[70%] space-y-1.5 rounded-lg border border-accent-brand/30 bg-accent-brand/20 px-3 py-2">
          <div className="h-2 w-20 rounded bg-foreground/15" />
        </div>
        <div className="h-7 w-7 shrink-0 rounded-full bg-foreground/10" />
      </div>

      {/* Bot typing indicator */}
      <div className="flex items-start gap-2">
        <div className="h-7 w-7 shrink-0 rounded-full bg-accent-brand/30" />
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:200ms]" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:400ms]" />
        </div>
      </div>
    </MockupShell>
  );
}

/** Workflow skeleton: two nodes connected by a line, then a log feed
 *  whose last entry pulses to suggest "running". */
export function AutomationMockup() {
  return (
    <MockupShell>
      {/* Workflow nodes connected by a line */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <div className="h-2 w-12 rounded bg-foreground/15" />
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-1.5 rounded-md border border-accent-brand/40 bg-accent-brand/10 px-2.5 py-1.5">
          <div className="h-2 w-2 rounded-full bg-accent-brand" />
          <div className="h-2 w-10 rounded bg-foreground/15" />
        </div>
      </div>

      {/* Vertical connector hint */}
      <div className="ml-2 h-3 w-px bg-border" />

      {/* Log feed — last entry pulses */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <div className="h-2 w-32 rounded bg-foreground/10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <div className="h-2 w-28 rounded bg-foreground/10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-brand" />
          <div className="h-2 w-24 rounded bg-foreground/15" />
        </div>
      </div>
    </MockupShell>
  );
}

/** Dashboard skeleton: header + CTA, three stat tiles, mini bar-chart. */
export function MvpMockup() {
  return (
    <MockupShell>
      {/* Dashboard header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-20 rounded bg-foreground/15" />
          <div className="h-2 w-12 rounded bg-foreground/5" />
        </div>
        <div className="h-7 w-16 rounded-md bg-accent-brand/20" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="space-y-1 rounded-md border border-border p-2"
          >
            <div className="h-1.5 w-8 rounded bg-foreground/5" />
            <div className="h-3 w-10 rounded bg-foreground/15" />
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div className="flex h-10 items-end gap-1 pt-1">
        {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-accent-brand/30"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </MockupShell>
  );
}
