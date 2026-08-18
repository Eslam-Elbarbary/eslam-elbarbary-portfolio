"use client";

import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { cn, isPlaceholder } from "@/lib/utils";
import type { ExperienceIcon, ExperienceItem } from "@/types/portfolio";

const MAX_HIGHLIGHTS = 4;

const experienceIcons: Record<
  ExperienceIcon,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  briefcase: BriefcaseBusiness,
};

type ExperienceCardProps = {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
};

export function ExperienceCard({ item, index, isLast }: ExperienceCardProps) {
  const highlights = item.highlights.slice(0, MAX_HIGHLIGHTS);
  const period = isPlaceholder(item.period) ? "Dates to be added" : item.period;
  const reduce = useReducedMotion();

  return (
    <Reveal delay={index * 0.16} as="li">
      <div className="grid items-start md:grid-cols-[72px_24px_minmax(0,1fr)] md:gap-x-5">
        <div className="hidden md:block">
          <ExperienceMark item={item} />
        </div>

        <div
          className="relative hidden h-full min-h-[72px] md:block"
          aria-hidden="true"
        >
          <span
            className={cn(
              "absolute left-1/2 top-8 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full",
              item.current
                ? "bg-gradient-to-r from-primary to-accent"
                : "border border-line-strong bg-muted/80",
            )}
          />
          {!isLast ? (
            <motion.span
              className="absolute bottom-[-2rem] left-1/2 top-11 w-px origin-top -translate-x-1/2 bg-line"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
        </div>

        <article
          className={cn(
            "rounded-[22px] border border-line bg-surface/45 p-5 transition-[border-color,transform,box-shadow] duration-300 md:p-6",
            "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-32px_rgb(99_102_241_/_0.55)]",
            item.current &&
              "border-primary/20 bg-[linear-gradient(160deg,rgb(99_102_241_/_0.1),transparent_46%),linear-gradient(rgb(13_18_28_/_0.65),rgb(13_18_28_/_0.65))]",
          )}
        >
          <header className="flex items-start gap-3 md:block">
            <div className="md:hidden">
              <ExperienceMark item={item} />
            </div>
            <div className="min-w-0 flex-1 md:flex md:items-start md:justify-between md:gap-4">
              <div>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink md:text-xl">
                  {item.role}
                </h3>
                <CompanyLabel item={item} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0 md:shrink-0 md:flex-col md:items-end">
                <p className="font-mono text-[11px] text-muted md:whitespace-nowrap">
                  {period}
                </p>
                {item.mode ? <TypeBadge>{item.mode}</TypeBadge> : null}
              </div>
            </div>
          </header>

          <p className="mt-4 text-sm leading-relaxed text-muted">{item.summary}</p>

          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-[13px] leading-snug text-ink/85"
              >
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Reveal>
  );
}

function ExperienceMark({ item }: { item: ExperienceItem }) {
  if (item.logo) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-line bg-elevated md:h-[72px] md:w-[72px] md:rounded-2xl">
        <Image
          src={item.logo}
          alt={`${item.company} logo`}
          fill
          sizes="72px"
          className="object-cover"
        />
      </div>
    );
  }

  const Icon = item.icon ? experienceIcons[item.icon] : BriefcaseBusiness;

  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/25 bg-gradient-to-br from-primary/30 to-accent/15 md:h-[72px] md:w-[72px] md:rounded-2xl">
      <Icon className="h-5 w-5 text-ink md:h-7 md:w-7" aria-hidden />
    </div>
  );
}

function CompanyLabel({ item }: { item: ExperienceItem }) {
  if (item.companyUrl) {
    return (
      <a
        href={item.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-1 inline-flex min-w-0 items-center gap-1 text-sm text-primary-soft transition-colors hover:text-accent link-inline"
      >
        {item.company}
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </a>
    );
  }

  return <p className="mt-1 text-sm text-primary-soft">{item.company}</p>;
}

function TypeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-elevated/80 px-2.5 py-0.5 text-[11px] text-ink/80">
      {children}
    </span>
  );
}
