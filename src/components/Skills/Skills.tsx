import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillNetwork from './SkillNetwork';
import { skillCategories } from '@/data/skills';
import { EASE } from '@/lib/constants';

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative scroll-mt-24 py-[14vh]">
      <div className="container-editorial">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Capabilities"
            title="An engineering constellation"
            subtitle="The tools and disciplines I reach for. Hover a cluster to see how they connect."
          />

          {/* Category legend */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE.outExpo }}
            className="flex flex-wrap gap-x-5 gap-y-2 md:max-w-xs md:justify-end"
          >
            {skillCategories.map((c) => (
              <li key={c.id} className="flex items-center gap-2 text-xs text-chalk-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                {c.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-10">
          <SkillNetwork />
        </div>
      </div>
    </section>
  );
}
