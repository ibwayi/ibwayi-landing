import type { Transition, Variants } from "motion/react";

/**
 * Centralized reveal animations. Used across Hero, Services, Footer, and
 * (future) About so the whole landing page shares one choreography.
 *
 * Style anchor: chronark.com — blur-in + slide-up + fade, premium-paced
 * (~0.7s per element), staggered via parent variants. Never bouncy.
 *
 * Each section also calls useReducedMotion() and falls back to
 * `reducedReveal` when the user has prefers-reduced-motion set, because
 * setting `filter: blur` from JS bypasses the global CSS short-circuit.
 */

// chronark-style "anticipation" curve, sharp out-deceleration.
export const EASE_OUT_EXPO: Transition["ease"] = [0.22, 1, 0.36, 1];

const baseTransition: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
};

export const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

export const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const revealSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const revealSubtleStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

// Reduced-motion fallback — opacity only, no transform, no blur.
export const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const reducedStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};
