import { cn } from "@/lib/utils";

interface AvatarProps {
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Placeholder avatar — grey rounded bubble with the "I" initial.
 *
 * To replace with real photo:
 * 1. Add image to /public/avatar.jpg (square, min 256x256, optimised webp/jpg)
 * 2. Swap the inner content for <Image src="/avatar.jpg" alt="Ibwayi" fill />
 *    and add `relative overflow-hidden` to the wrapper.
 * 3. Test on mobile + desktop, both themes.
 *
 * The wrapper accepts external sizing (className/style) so the Nav can drive
 * the box dimensions via Framer Motion. Internal sizing scales with the box
 * via h-full/w-full on the inner content if needed.
 */
export function Avatar({ size = "lg", className }: AvatarProps) {
  return (
    <div
      aria-label="Ibwayi"
      className={cn(
        "flex select-none items-center justify-center rounded-full bg-muted font-bold text-foreground/70",
        size === "lg" ? "h-14 w-14 text-2xl" : "h-8 w-8 text-sm",
        className,
      )}
    >
      I
    </div>
  );
}
