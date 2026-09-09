import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience, type ExperienceEntry } from '@/data/experience';
import CompanyLogo from '@/components/ui/CompanyLogo';
import { EASE } from '@/lib/constants';

/**
 * Interactive vertical timeline. The accent line grows with scroll, entries
 * slide in, and technical keywords stagger into view.
 */
export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.65'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const glowY = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative mt-20 pl-8 sm:pl-14">
      {/* Static track */}
      <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-white/[0.08]" />
      {/* Growing progress line */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-accent-bright via-accent to-accent/20"
      />
      {/* Travelling glow node */}
      <motion.div
        style={{ top: glowY }}
        className="absolute left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-accent-bright shadow-[0_0_18px_4px_rgba(42,139,242,0.6)]" />
      </motion.div>

      <div className="flex flex-col gap-24">
        {experience.map((entry, i) => (
          <TimelineEntry key={entry.company} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
      }}
      className="relative"
    >
      {/* Node marker */}
      <span
        className={`absolute -left-8 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:-left-14 ${
          entry.current ? '' : ''
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            entry.current ? 'bg-accent-bright' : 'bg-chalk-faint'
          }`}
        />
      </span>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
        }}
        className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
      >
        <span className="font-sans text-sm tabular-nums text-chalk-faint">{entry.period}</span>
        {entry.current && (
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent-bright">
            Now
          </span>
        )}
      </motion.div>

      <div className="mt-3 flex items-center gap-3 sm:gap-4">
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE.outExpo } },
          }}
          className="inline-flex"
        >
          <CompanyLogo
            name={entry.company}
            initials={entry.initials}
            brandColor={entry.brandColor}
            logo={entry.logo}
          />
        </motion.span>
        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
          }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none text-chalk"
        >
          {entry.company}
        </motion.h3>
      </div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
        }}
        className="mt-2 text-lg text-chalk"
      >
        {entry.role}
        {entry.location && <span className="text-chalk-faint"> · {entry.location}</span>}
      </motion.p>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
        }}
        className="mt-5 max-w-2xl text-pretty leading-relaxed text-chalk-muted"
      >
        {entry.summary}
      </motion.p>

      {/* Highlights */}
      <ul className="mt-6 grid max-w-2xl gap-2.5">
        {entry.highlights.map((h) => (
          <motion.li
            key={h}
            variants={{
              hidden: { opacity: 0, x: -12 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE.outExpo } },
            }}
            className="flex gap-3 text-sm leading-relaxed text-chalk-muted"
          >
            <span className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
            {h}
          </motion.li>
        ))}
      </ul>

      {/* Keywords */}
      <div className="mt-7 flex flex-wrap gap-2">
        {entry.keywords.map((kw) => (
          <motion.span
            key={kw}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE.outExpo } },
            }}
            className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-chalk-muted transition-colors duration-300 hover:border-white/25 hover:text-chalk"
            data-index={index}
          >
            {kw}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
}
