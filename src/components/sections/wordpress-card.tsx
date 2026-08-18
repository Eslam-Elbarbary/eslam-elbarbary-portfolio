import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { WordPressProject } from "@/types/portfolio";

type WordPressCardProps = {
  project: WordPressProject;
  featured?: boolean;
  priority?: boolean;
};

export function WordPressCard({
  project,
  featured = false,
  priority = false,
}: WordPressCardProps) {
  const ready = project.captureStatus === "ready";
  const host = new URL(project.liveUrl).host;

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title} website`}
      className={cn(
        "group surface-card flex h-full flex-col overflow-hidden transition-[border-color,transform,box-shadow] duration-300",
        "focus-visible:border-primary/50",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_40px_-28px_rgb(99_102_241_/_0.4)]",
        featured && "md:p-0",
      )}
    >
      <div className="overflow-hidden border-b border-line bg-elevated">
        <div className="flex items-center gap-1.5 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
          <span className="ml-2 truncate font-mono text-[10px] text-muted">
            {host}
          </span>
        </div>
        <div className="relative aspect-video overflow-hidden bg-background">
          {ready ? (
            <Image
              src={project.image}
              alt={`${project.title} website screenshot`}
              fill
              priority={priority}
              quality={90}
              sizes={
                featured
                  ? "(min-width: 768px) 42vw, 100vw"
                  : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
              }
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-end bg-[linear-gradient(160deg,rgb(99_102_241_/_0.16),rgb(17_24_39)_55%)] p-4">
              <p className="text-sm text-ink/80">{project.title}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {project.label ?? project.category}
        </p>
        <h3 className="mt-1.5 flex min-w-0 items-start justify-between gap-2 font-display text-base font-semibold text-ink sm:text-lg">
          <span className="min-w-0 leading-snug">{project.title}</span>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </h3>
        {featured && project.label ? (
          <p className="mt-1 text-xs text-muted">{project.category}</p>
        ) : null}
        {featured && project.description ? (
          <p className="mt-2 text-sm text-muted">{project.description}</p>
        ) : null}
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <span className="shrink-0 text-sm text-primary-soft link-inline w-fit">Visit Website</span>
        </div>
      </div>
    </a>
  );
}
