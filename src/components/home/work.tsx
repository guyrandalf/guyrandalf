import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";
import { ProjectCard, type CardProject } from "./project-card";

export function Work({ projects }: { projects: CardProject[] }) {
  if (projects.length === 0) return null;
  return (
    <section id="work" className="scroll-mt-24 py-14">
      <SectionHeader
        eyebrow="Selected work"
        title="Systems, not screenshots"
        description="Live AI features, a separately-hosted multi-agent engine, and the full-stack fundamentals underneath. Hover the info icon on any card."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
