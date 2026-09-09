/**
 * Centralized design + scene constants.
 * Tweak animation feel and section anchors here without touching component logic.
 */

export const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/** Navigation items (subset of sections that appear in the top nav). */
export const NAV_ITEMS = [
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

/** Easing curves shared between CSS, GSAP and Framer Motion. */
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuint: [0.83, 0, 0.17, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
};

/** Canonical animation durations (seconds). */
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.6,
};

/** Walmart-inspired accent, exposed for the 3D background lighting. */
export const ACCENT_HEX = '#0a75e0';
export const ACCENT_BRIGHT_HEX = '#2a8bf2';

/**
 * Occasional lightning + thunder-flash in the animated backdrop.
 * Set `enabled: false` to remove it entirely.
 */
export const LIGHTNING = {
  enabled: true,
  color: '#cdefff',
  /** Random gap between strikes, in seconds. */
  minInterval: 3.4,
  maxInterval: 7.5,
  /** Peak brightness of the screen flash (0-1). */
  flashStrength: 0.26,
};
