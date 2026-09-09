import { useEffect, useRef } from 'react';

export interface Pointer {
  /** Normalized -1..1 across the viewport. */
  x: number;
  y: number;
}

/**
 * Tracks the pointer as a normalized value without triggering React re-renders.
 * Consumers read the ref inside rAF loops (parallax, 3D look-at, etc).
 */
export function usePointer() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pointer;
}
