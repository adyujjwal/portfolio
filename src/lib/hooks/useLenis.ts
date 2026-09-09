import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

/**
 * Boots Lenis smooth scrolling and wires it to GSAP's ScrollTrigger so
 * scroll-driven timelines stay perfectly in sync with the smoothed scroll.
 *
 * Exposes the Lenis instance via a ref for programmatic scrolling.
 * Respects prefers-reduced-motion by disabling smoothing.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reducedMotion]);

  return lenisRef;
}

/** Smoothly scrolls to a section id, falling back to native scroll. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
