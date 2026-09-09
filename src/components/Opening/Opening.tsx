import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, CalendarClock, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { socialLinks } from '@/data/socialLinks';
import { asset } from '@/lib/asset';
import { EASE } from '@/lib/constants';
import { scrollToSection } from '@/lib/hooks/useLenis';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.outExpo } },
};
const line = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1, ease: EASE.outExpo } },
};

/**
 * Full-bleed, text-only opening. No 3D character or video; the animated
 * backdrop shows through. Uses the full page width with oversized editorial type.
 */
export default function Opening() {
  const reducedMotion = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 30, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 100, damping: 30, mass: 0.6 });
  const px = useTransform(sx, [-1, 1], [-12, 12]);
  const py = useTransform(sy, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reducedMotion]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full flex-col justify-center px-[var(--gutter)] pb-24 pt-[var(--nav-height)]"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ x: reducedMotion ? 0 : px, y: reducedMotion ? 0 : py }}
        className="w-full"
      >
        {/* Eyebrow */}
        <motion.div variants={fade} className="mb-8 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="eyebrow text-[0.9rem] tracking-[0.28em]">Currently building at</span>
          <img
            src={asset('/logos/walmart-spark.svg')}
            alt="Walmart"
            className="h-6 w-6"
            aria-hidden="true"
          />
          <span className="eyebrow text-[0.9rem] tracking-[0.28em] text-chalk">Walmart</span>
        </motion.div>

        {/* Full-width headline */}
        <h1 className="font-display font-semibold leading-[0.9] tracking-tightest text-chalk">
          <span className="reveal-line block text-[clamp(3.25rem,13vw,15rem)]">
            <motion.span variants={line} className="block">
              Hi, I&rsquo;m Adway.
            </motion.span>
          </span>
        </h1>

        {/* Meta row spanning the width */}
        <div className="mt-10 flex w-full flex-col gap-8 border-t border-white/[0.08] pt-8 md:flex-row md:items-start md:justify-between">
          <motion.p
            variants={fade}
            className="font-display text-[clamp(1.15rem,2.4vw,1.9rem)] font-medium text-chalk"
          >
            Senior Software Engineer
          </motion.p>
          <motion.p
            variants={fade}
            className="max-w-xl text-pretty text-base leading-relaxed text-chalk-muted md:text-right"
          >
            Building scalable systems, thoughtful products, and experiences that make technology
            feel simple.
          </motion.p>
        </div>

        {/* Primary call to action */}
        <motion.div variants={fade} className="mt-10">
          <MagneticButton
            href={socialLinks.topmate}
            variant="solid"
            dataCursor="open"
            target="_blank"
            rel="noreferrer"
          >
            <CalendarClock size={16} />
            Book a 1:1 call
            <ArrowUpRight size={14} className="opacity-60" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection('intro')}
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="group absolute bottom-8 left-[var(--gutter)] flex items-center gap-3 text-chalk-muted transition-colors hover:text-chalk"
        aria-label="Scroll to explore"
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.button>
    </section>
  );
}
