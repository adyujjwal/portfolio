import { useEffect, useState } from 'react';

/**
 * Tracks a CSS media query. SSR-safe and updates on change.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True on fine-pointer (mouse) devices; used to gate the custom cursor & 3D detail. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px) and (pointer: fine)');
}

/** True on coarse pointers (touch). */
export function useIsTouch(): boolean {
  return useMediaQuery('(pointer: coarse)');
}
