import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { WordPressGallery } from "@/components/sections/wordpress-gallery";
import { portfolio } from "@/data/portfolio";

export function OtherWorkSection() {
  const { otherWork } = portfolio.content;

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={otherWork.eyebrow}
          title={otherWork.title}
          description={otherWork.description}
        />
        <WordPressGallery />
      </Container>
    </Section>
  );
}
