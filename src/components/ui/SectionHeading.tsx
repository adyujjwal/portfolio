import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/constants';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  index?: string;
  className?: string;
}

/**
 * Editorial section heading with an eyebrow label, a masked line-reveal title,
 * and optional subtitle. Reveals on scroll into view.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  index,
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {(eyebrow || index) && (
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
        >
          {index && (
            <span className="font-sans text-[0.7rem] font-medium tabular-nums text-accent">
              {index}
            </span>
          )}
          {index && <span className="h-px w-8 bg-white/15" />}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </motion.div>
      )}

      <motion.h2
        className="reveal-line text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[0.98] text-chalk"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.span
          variants={{
            hidden: { y: '110%' },
            visible: { y: '0%', transition: { duration: 0.9, ease: EASE.outExpo } },
          }}
        >
          {title}
        </motion.span>
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`mt-6 max-w-xl text-pretty text-base leading-relaxed text-chalk-muted ${
            align === 'center' ? 'mx-auto' : ''
          }`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE.outExpo }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
