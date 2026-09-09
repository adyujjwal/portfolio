import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';

type CursorVariant = 'default' | 'view' | 'open' | 'hover';

const LABELS: Record<CursorVariant, string> = {
  default: '',
  view: 'VIEW',
  open: 'OPEN',
  hover: '',
};

/**
 * Premium custom cursor.
 * - A small dot follows the pointer 1:1.
 * - A trailing ring lags with spring physics.
 * - Elements opt in via `data-cursor="view|open|hover"`.
 * Disabled entirely on touch / non-desktop devices.
 */
export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [hidden, setHidden] = useState(true);
  const [down, setDown] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 400, damping: 40, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 400, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!isDesktop) return;
    document.documentElement.classList.add('has-custom-cursor');

    const show = () => setHidden(false);
    const onMove = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      // Always reveal on movement; covers leaving and re-entering the window.
      setHidden(false);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      const v = (el?.dataset.cursor as CursorVariant) ?? 'default';
      setVariant(v);
    };
    const onLeave = () => setHidden(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerenter', show);
    document.addEventListener('mouseenter', show);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerenter', show);
      document.removeEventListener('mouseenter', show);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [isDesktop, dotX, dotY]);

  if (!isDesktop) return null;

  const label = LABELS[variant];
  const isLabelled = label.length > 0;
  const ringSize = isLabelled ? 64 : variant === 'hover' ? 46 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* Trailing ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : 1,
          backgroundColor: isLabelled ? 'rgba(10,117,224,0.92)' : 'rgba(245,245,245,0)',
          borderColor: isLabelled ? 'rgba(10,117,224,0)' : 'rgba(245,245,245,0.4)',
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <div
          className="rounded-full border"
          style={{ position: 'absolute', inset: 0, borderColor: 'inherit' }}
        />
        {isLabelled && (
          <span className="font-sans text-[0.6rem] font-semibold tracking-[0.18em] text-white">
            {label}
          </span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chalk"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: hidden || isLabelled ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
