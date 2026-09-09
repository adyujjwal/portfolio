import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Premium loading overlay: wordmark, role, and a hairline progress meter.
 * Advances quickly with a little easing, then reveals the site.
 */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const done = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      const t = setTimeout(onComplete, 200);
      return () => clearTimeout(t);
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = 1700;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        setTimeout(onComplete, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, reducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center">
        <motion.h1
          className="font-display text-[clamp(3rem,12vw,7rem)] font-semibold leading-none tracking-editorial text-chalk"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          ADWAY
        </motion.h1>
        <motion.p
          className="mt-4 font-sans text-[0.7rem] font-medium uppercase tracking-[0.42em] text-chalk-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          Senior Software Engineer
        </motion.p>
      </div>

      {/* Progress meter */}
      <div className="absolute bottom-[12vh] left-1/2 flex w-[min(72vw,22rem)] -translate-x-1/2 items-center gap-4">
        <div className="relative h-px flex-1 overflow-hidden bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 bg-chalk"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="w-9 text-right font-sans text-[0.7rem] tabular-nums text-chalk-muted">
          {String(progress).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}
