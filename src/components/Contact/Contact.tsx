import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Code2, CalendarClock, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { socialLinks, CONTACT_EMAIL_HREF } from '@/data/socialLinks';
import { usePointer } from '@/lib/hooks/usePointer';
import { usePrefersReducedMotion, useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { EASE } from '@/lib/constants';

const ContactScene = lazy(() => import('./ContactScene'));

/**
 * Closing "moment" of the experience: oversized invitation over a subtle
 * glowing particle orb, with the primary contact actions.
 */
export default function Contact() {
  const pointerRef = usePointer();
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const showOrb = !reducedMotion && isDesktop;

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative flex min-h-[92vh] scroll-mt-24 items-center overflow-hidden py-[14vh]"
    >
      {/* Orb background */}
      {showOrb && (
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <Suspense fallback={null}>
            <ContactScene pointerRef={pointerRef} />
          </Suspense>
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, transparent 30%, rgba(8,8,8,0.7) 100%)',
        }}
      />

      <div className="container-editorial relative">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-8 block"
        >
          (08) Contact
        </motion.span>

        <motion.h2
          className="max-w-5xl font-display text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.92] tracking-tightest text-chalk"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="reveal-line block">
            <motion.span
              className="block"
              variants={{
                hidden: { y: '110%' },
                visible: { y: '0%', transition: { duration: 1, ease: EASE.outExpo } },
              }}
            >
              Let&rsquo;s build
            </motion.span>
          </span>
          <span className="reveal-line block">
            <motion.span
              className="block"
              variants={{
                hidden: { y: '110%' },
                visible: { y: '0%', transition: { duration: 1, delay: 0.08, ease: EASE.outExpo } },
              }}
            >
              something great.
            </motion.span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE.outExpo }}
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-chalk-muted"
        >
          Have an interesting problem, project, or opportunity? I&rsquo;d love to hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE.outExpo }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={socialLinks.topmate}
            variant="solid"
            dataCursor="open"
            target="_blank"
            rel="noreferrer"
          >
            <CalendarClock size={16} />
            Book a 1:1
            <ArrowUpRight size={14} className="opacity-60" />
          </MagneticButton>
          <MagneticButton href={CONTACT_EMAIL_HREF} variant="outline" dataCursor="open">
            <Mail size={16} />
            Email me
          </MagneticButton>
          <MagneticButton
            href={socialLinks.linkedin}
            variant="outline"
            dataCursor="open"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} />
            LinkedIn
            <ArrowUpRight size={14} className="opacity-60" />
          </MagneticButton>
          <MagneticButton
            href={socialLinks.github}
            variant="outline"
            dataCursor="open"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            GitHub
            <ArrowUpRight size={14} className="opacity-60" />
          </MagneticButton>
          <MagneticButton
            href={socialLinks.leetcode}
            variant="outline"
            dataCursor="open"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={16} />
            LeetCode
            <ArrowUpRight size={14} className="opacity-60" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
