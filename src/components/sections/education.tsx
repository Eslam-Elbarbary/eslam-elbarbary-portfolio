import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { isPlaceholder } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

export function EducationSection() {
  const { education } = portfolio.content;

  return (
    <Section id="education">
      <Container>
        <SectionHeader eyebrow={education.eyebrow} title={education.title} />

        <div className="mt-10 grid gap-4">
          {portfolio.education.map((item) => (
            <Reveal key={item.id}>
              <article className="surface-card flex min-w-0 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-elevated text-accent">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted">
                    {isPlaceholder(item.period)
                      ? "Dates to be added"
                      : item.period}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                  {item.gpa ? (
                    <p className="mt-3 inline-flex rounded-full border border-line bg-elevated px-3 py-1 text-sm text-ink">
                      GPA {item.gpa}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
