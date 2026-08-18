import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SkillCategoryCard } from "@/components/sections/skill-category";
import { portfolio } from "@/data/portfolio";

export function SkillsSection() {
  const { skills } = portfolio.content;

  return (
    <Section id="skills">
      <Container>
        <SectionHeader
          eyebrow={skills.eyebrow}
          title={skills.title}
          description={skills.description}
        />

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2">
          {portfolio.skills.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
