import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/data/projects';
import { asset } from '@/lib/asset';
import { EASE } from '@/lib/constants';

interface ProjectShowcaseProps {
  project: Project;
  reversed?: boolean;
}

/**
 * A single large project showcase with an abstract animated visual and
 * editorial content. Layout alternates side-to-side; rich hover interactions.
 */
export default function ProjectShowcase({ project, reversed }: ProjectShowcaseProps) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className="group grid items-center gap-8 md:grid-cols-12 md:gap-12"
    >
      {/* Visual */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.outExpo } },
        }}
        className={`md:col-span-7 ${reversed ? 'md:order-2' : 'md:order-1'}`}
      >
        <ProjectVisual project={project} />
      </motion.div>

      {/* Content */}
      <div
        className={`md:col-span-5 ${reversed ? 'md:order-1 md:pr-4' : 'md:order-2 md:pl-4'}`}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.outExpo } },
          }}
          className="flex items-center gap-4"
        >
          <span className="font-display text-sm tabular-nums text-accent transition-transform duration-500 group-hover:-translate-y-1">
            {project.index}
          </span>
          <span className="h-px w-8 bg-white/15" />
          <span className="eyebrow">{project.category}</span>
        </motion.div>

        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
          }}
          className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-none text-chalk transition-transform duration-500 group-hover:translate-x-1"
        >
          {project.name}
        </motion.h3>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
          }}
          className="mt-5 text-pretty leading-relaxed text-chalk-muted"
        >
          {project.description}
        </motion.p>

        {/* Problem / Solution / Impact */}
        <motion.dl
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE.outExpo } },
          }}
          className="mt-7 grid gap-4 border-t border-white/[0.07] pt-6"
        >
          {(
            [
              ['Problem', project.problem],
              ['Solution', project.solution],
              ['Impact', project.impact],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3">
              <dt className="pt-0.5 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-chalk-faint">
                {label}
              </dt>
              <dd className="text-sm leading-relaxed text-chalk-muted">{value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* Stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-chalk-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-7 flex items-center gap-5">
          {project.demo && (
            <a
              href={project.demo}
              data-cursor="open"
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-chalk"
            >
              Live demo
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              data-cursor="open"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-chalk-muted transition-colors hover:text-chalk"
            >
              <Github size={15} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/** Abstract, tinted visual panel that stands in for a project screenshot. */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      data-cursor="view"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800"
    >
      {/* Ambient tint that intensifies on hover */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70"
        style={{
          background: `radial-gradient(120% 90% at 25% 20%, ${project.tint}33, transparent 60%)`,
        }}
      />

      {project.image ? (
        <>
          <img
            src={asset(project.image)}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
        </>
      ) : (
        <>
          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '46px 46px',
              maskImage: 'radial-gradient(80% 80% at 50% 50%, #000, transparent)',
            }}
          />

          {/* Zooming inner composition */}
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]">
            {/* Ghost index */}
            <span className="select-none font-display text-[clamp(6rem,18vw,12rem)] font-semibold leading-none text-white/[0.05]">
              {project.index}
            </span>
            {/* Mock UI bars */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2.5">
              {[0.9, 0.6, 0.75].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-white/[0.08]"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
            {/* Accent node */}
            <span
              className="absolute right-6 top-6 h-3 w-3 rounded-full"
              style={{ backgroundColor: project.tint, boxShadow: `0 0 24px 4px ${project.tint}88` }}
            />
          </div>
        </>
      )}

      {/* View affordance */}
      <div className="absolute bottom-5 right-5 flex items-center gap-1.5 text-xs font-medium text-chalk opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span>View project</span>
        <ArrowUpRight size={14} />
      </div>
    </div>
  );
}
