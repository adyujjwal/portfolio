import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
  /** How far the element is allowed to drift toward the cursor (px). */
  strength?: number;
  ariaLabel?: string;
  dataCursor?: 'view' | 'open' | 'hover';
  target?: string;
  rel?: string;
}

/**
 * Magnetic button/link. On desktop it subtly drifts toward the cursor and
 * springs back on leave. Renders an <a> when `href` is present, else a <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  strength = 22,
  ariaLabel,
  dataCursor = 'hover',
  target,
  rel,
}: MagneticButtonProps) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength * 2);
    y.set((relY / rect.height) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const variants: Record<string, string> = {
    solid: 'bg-chalk text-ink-950 hover:bg-white',
    outline: 'border border-white/20 text-chalk hover:border-white/50 hover:bg-white/[0.04]',
    ghost: 'text-chalk hover:text-white',
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 will-change-transform';

  const content = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor={dataCursor}
        target={target}
        rel={rel}
        className="inline-flex focus-visible:outline-offset-8"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor={dataCursor}
      className="inline-flex focus-visible:outline-offset-8"
    >
      {content}
    </button>
  );
}
