import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { principles } from '@/data/principles';
import { EASE } from '@/lib/constants';

/**
 * "How I Think": engineering principles revealed one by one on scroll.
 */
export default function Philosophy() {
  return (
    <section id="philosophy" aria-label="Engineering philosophy" className="relative py-[14vh]">
      <div className="container-editorial">
        <SectionHeading index="05" eyebrow="Principles" title="How I Think" />

        <div className="mt-16 border-t border-white/[0.07]">
          {principles.map((p) => (
            <motion.div
              key={p.index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="group grid grid-cols-1 gap-4 border-b border-white/[0.07] py-10 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
                }}
                className="font-display text-2xl font-medium tabular-nums text-accent md:col-span-2"
              >
                {p.index}
              </motion.span>

              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
                }}
                className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-none text-chalk md:col-span-4"
              >
                {p.title}
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
                }}
                className="max-w-md text-pretty text-lg leading-relaxed text-chalk-muted md:col-span-6"
              >
                {p.statement}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
