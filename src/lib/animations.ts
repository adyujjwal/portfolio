import type { Variants, Transition } from 'framer-motion';
import { EASE, DURATION } from './constants';

/**
 * Reusable Framer Motion variants + GSAP-friendly helpers.
 * Keep animation "magic numbers" here; components stay declarative.
 */

const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE.outExpo,
};

/** Fade + rise into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

/** Simple opacity fade. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.outExpo } },
};

/** Parent that staggers its children into view. */
export const staggerChildren = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Scale + fade reveal for imagery / panels. */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

/** Word / line reveal; clips upward from a mask. */
export const textReveal: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: DURATION.base, ease: EASE.outExpo },
  },
};

/** Blur-in for cinematic entrances. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(14px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.outExpo },
  },
};

/** Shared viewport config for whileInView animations. */
export const inViewport = { once: true, amount: 0.35 } as const;

/**
 * Split a string into word spans wrapped for staggered reveals.
 * Returns the array of words; components decide how to render/animate.
 */
export const splitWords = (text: string): string[] => text.split(' ');
