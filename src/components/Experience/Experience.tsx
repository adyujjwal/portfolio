import SectionHeading from '@/components/ui/SectionHeading';
import ExperienceTimeline from './ExperienceTimeline';

export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience" className="relative scroll-mt-24 py-[14vh]">
      <div className="container-editorial">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Experience"
          subtitle="A journey through the systems I've built and the problems I've solved."
        />
        <ExperienceTimeline />
      </div>
    </section>
  );
}
