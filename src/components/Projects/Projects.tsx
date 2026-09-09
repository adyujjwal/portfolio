import SectionHeading from '@/components/ui/SectionHeading';
import ProjectShowcase from './ProjectShowcase';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" aria-label="Selected work" className="relative scroll-mt-24 py-[14vh]">
      <div className="container-editorial">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Selected Work"
          subtitle="A handful of projects where design, engineering and scale meet."
        />

        <div className="mt-24 flex flex-col gap-32 md:gap-40">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.name} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
