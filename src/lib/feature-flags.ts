/**
 * Feature flags for landing-page sections.
 *
 * Toggle these to show/hide sections without removing code. Useful for
 * sections that need real content before going live (testimonials etc.).
 */
export const FEATURE_FLAGS = {
  /**
   * Testimonials section visibility.
   * Initially false because no real testimonials yet.
   * Toggle to true once 3+ real customer quotes are available.
   */
  TESTIMONIALS_VISIBLE: false,
} as const;
