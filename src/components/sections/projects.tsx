import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { portfolio } from "@/data/portfolio";

export function ProjectsSection() {
  const { projects } = portfolio.content;

  return (
    <Section id="projects" tone="alt">
      <Container>
        <SectionHeader
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
        />

        <div className="mt-12 flex flex-col gap-8">
          {portfolio.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          <Reveal>
            <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface/40 px-6 py-10 text-center">
              <p className="font-mono text-sm text-muted">
                {projects.comingSoon}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
