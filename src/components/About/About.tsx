import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { about } from '@/data/about';
import { EASE } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" aria-label="About me" className="relative scroll-mt-24 py-[14vh]">
      <div className="container-editorial">
        <SectionHeading index="07" eyebrow="About" title="A little about me." />

        <div className="mt-16 grid gap-14 md:grid-cols-12">
          {/* Bio */}
          <div className="md:col-span-7">
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE.outExpo }}
                  className="text-pretty text-lg leading-relaxed text-chalk-muted"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Labels */}
            <div className="mt-10 flex flex-wrap gap-3">
              {about.labels.map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE.outExpo }}
                  className="rounded-full border border-white/[0.1] px-4 py-1.5 text-sm text-chalk"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Detail lists */}
          <div className="md:col-span-5 md:pl-6">
            <div className="grid gap-8 sm:grid-cols-2">
              <DetailList title="Interested in" items={about.interests} />
              <DetailList title="Currently learning" items={about.learning} />
              <DetailList title="Favorite tech" items={about.favoriteTech} />
              <div>
                <h4 className="eyebrow mb-4">Enjoy building</h4>
                <p className="text-sm leading-relaxed text-chalk-muted">{about.enjoyBuilding}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="eyebrow mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-chalk-muted">
            <span className="h-1 w-1 rounded-full bg-accent/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
