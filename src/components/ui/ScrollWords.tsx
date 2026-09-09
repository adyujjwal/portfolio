import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface ScrollWordsProps {
  text: string;
  className?: string;
  /** Words (lowercased match) that should tint to the accent as they reveal. */
  accentWords?: string[];
  /** Scroll offset window controlling when the reveal happens. */
  offset?: [string, string];
}

/**
 * Editorial word-by-word reveal driven by scroll position.
 * Each word fades from faint to full as it passes through the viewport.
 */
export default function ScrollWords({
  text,
  className = '',
  accentWords = [],
  offset = ['start 0.85', 'end 0.5'],
}: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-expect-error framer accepts string edge offsets
    offset,
  });

  const words = text.split(' ');
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase().replace(/[.,]/g, '')));

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = word.toLowerCase().replace(/[.,]/g, '');
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={accentSet.has(clean)}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}

function Word({ children, progress, range, accent }: WordProps) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const color = useTransform(progress, range, ['#f5f5f5', accent ? '#2a8bf2' : '#f5f5f5']);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  );
}
