import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { portfolio } from "@/data/portfolio";

export function AboutSection() {
  const { about } = portfolio.content;

  return (
    <Section id="about" tone="alt">
      <Container>
        <SectionHeader eyebrow={about.eyebrow} title={about.title} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.08 * (index + 1)}>
              <p className="text-base leading-relaxed text-muted md:text-[1.05rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
