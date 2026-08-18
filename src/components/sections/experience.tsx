import { Container } from "@/components/ui/container";
import { ExperienceCard } from "@/components/sections/experience-card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { portfolio } from "@/data/portfolio";

export function ExperienceSection() {
  const { experience } = portfolio.content;

  return (
    <Section id="experience" tone="alt">
      <Container>
        <SectionHeader
          eyebrow={experience.eyebrow}
          title={experience.title}
          description={experience.description}
        />

        <ol className="relative mt-12 space-y-6 md:space-y-8">
          {portfolio.experience.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              isLast={index === portfolio.experience.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
