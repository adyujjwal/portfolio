import { motion } from 'framer-motion';
import ScrollWords from '@/components/ui/ScrollWords';
import { EASE } from '@/lib/constants';

/**
 * Editorial introduction. A large statement animates word-by-word as the
 * reader scrolls, followed by a supporting paragraph with subtle highlights.
 */
export default function Intro() {
  return (
    <section id="intro" aria-label="Introduction statement" className="relative py-[16vh]">
      <div className="container-editorial">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE.outExpo }}
          className="eyebrow mb-10 block"
        >
          (01) Approach
        </motion.span>

        <ScrollWords
          text="I build software that works at scale."
          accentWords={['scale.']}
          className="max-w-5xl font-display text-[clamp(2.25rem,7vw,6rem)] font-semibold leading-[0.98] tracking-editorial text-chalk"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-sm leading-relaxed text-chalk-faint">
              A Senior Software Engineer focused on the systems beneath the surface.
            </p>
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <ScrollWords
              text="I’m a senior full-stack engineer with 6+ years building AI-powered, distributed systems at enterprise scale. My work spans Java, Spring Boot, React and Node.js, cloud-native microservices, and the LLM and agentic-AI systems built on top of them."
              accentWords={[
                'AI-powered,',
                'distributed',
                'systems',
                'scale.',
                'microservices,',
                'agentic-AI',
              ]}
              className="text-pretty text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-[1.35] text-chalk"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
