/**
 * Testimonials data.
 *
 * To replace placeholders with real testimonials:
 * 1. Replace each entry with real quote + author info.
 * 2. Add author photo to /public/testimonials/<slug>.jpg (optional —
 *    the placeholder uses an initial bubble; swap to <Image> in
 *    testimonials.tsx if you wire real photos in).
 * 3. Toggle FEATURE_FLAGS.TESTIMONIALS_VISIBLE to true in
 *    src/lib/feature-flags.ts.
 */
export interface Testimonial {
  slug: string;
  quote: string;
  author: string;
  role: string;
  /** First letter for the placeholder avatar bubble. */
  initial: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    slug: "placeholder-1",
    quote:
      "Replace this placeholder quote with a real customer testimonial. Keep it concise — 1 to 2 sentences highlighting a specific outcome.",
    author: "Customer Name",
    role: "Founder, Company Inc.",
    initial: "C",
  },
  {
    slug: "placeholder-2",
    quote:
      "Second placeholder quote. Mention a measurable result if possible — time saved, conversion lift, or specific feature delivered.",
    author: "Another Customer",
    role: "CEO, Another Company",
    initial: "A",
  },
  {
    slug: "placeholder-3",
    quote:
      "Third placeholder quote. Focus on collaboration quality, communication, or how the project felt — not just the deliverable.",
    author: "Third Customer",
    role: "Product Lead, Tech Co.",
    initial: "T",
  },
] as const;
