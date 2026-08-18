import { Award, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { isPlaceholder } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

export function CertificationsSection() {
  const { certifications } = portfolio.content;

  return (
    <Section tone="alt">
      <Container>
        <SectionHeader
          eyebrow={certifications.eyebrow}
          title={certifications.title}
          description={certifications.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {portfolio.certifications.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <article className="surface-card flex h-full flex-col p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-elevated text-primary-soft">
                    <Award className="h-5 w-5" />
                  </div>
                  <p className="font-mono text-xs text-muted">
                    {isPlaceholder(item.period)
                      ? "Dates to be added"
                      : item.period}
                  </p>
                </div>
                <p className="text-sm text-accent">{item.issuer}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                {item.summary ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                ) : null}
                {item.topics?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.topics.map((topic) => (
                      <Tag key={topic}>{topic}</Tag>
                    ))}
                  </div>
                ) : null}
                {item.credentialUrl ? (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm text-primary-soft transition-colors hover:text-accent group/link link-inline"
                  >
                    {item.credentialLabel ?? "View Certificate"}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
