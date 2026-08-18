"use client";

import Image from "next/image";
import { VisualReveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

type ProjectScreenshotProps = {
  project: Project;
  featured?: boolean;
  direction?: "left" | "right";
};

export function ProjectScreenshot({
  project,
  featured = false,
  direction = "left",
}: ProjectScreenshotProps) {
  if (!project.image || !project.imageWidth || !project.imageHeight) {
    return null;
  }

  const host = project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-elevated shadow-[0_18px_40px_-28px_rgb(0_0_0_/_0.85)] transition-[border-color,box-shadow] duration-300",
        "group-hover:border-primary/35 group-hover:shadow-[0_28px_50px_-24px_rgb(99_102_241_/_0.38)]",
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-background/90 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="ml-2 min-w-0 truncate font-mono text-[10px] text-muted">
          {host}
        </span>
      </div>
      <VisualReveal direction={direction}>
        <div className="relative w-full overflow-hidden bg-background">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={project.imageWidth}
            height={project.imageHeight}
            className="h-auto w-full max-w-full object-cover opacity-100"
            quality={90}
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 42vw, 100vw"
            }
          />
        </div>
      </VisualReveal>
    </figure>
  );
}
