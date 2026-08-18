"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { ProductPreview } from "@/components/sections/product-preview";
import { ProjectScreenshot } from "@/components/sections/project-screenshot";
import { Reveal } from "@/components/ui/reveal";
import { SocialIcon } from "@/components/ui/social-icon";
import { Tag } from "@/components/ui/tag";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const MAX_HIGHLIGHTS = 6;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const reversed = !project.featured && index % 2 === 1;
  const highlights = project.highlights.slice(0, MAX_HIGHLIGHTS);
  const hasImage = Boolean(project.image);
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 } as const,
    transition: {
      duration: 0.45,
      delay: reduce ? 0 : 0.18 + delay,
      ease: easings.premium,
    },
  });

  return (
    <Reveal>
      <PointerGlow
        as="article"
        className={cn(
          "group surface-card min-w-0 overflow-hidden transition-[border-color,transform,box-shadow] duration-300",
          "hover:-translate-y-1.5 hover:border-primary/40",
          project.featured &&
            "shadow-glow hover:shadow-[0_28px_64px_-28px_rgb(99_102_241_/_0.62)]",
        )}
      >
        <div
          className={cn(
            "grid min-w-0 lg:items-center",
            project.featured
              ? "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"
              : "lg:grid-cols-2",
            reversed && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div
            className={cn(
              "min-w-0 border-b border-line p-3 sm:p-5 lg:border-b-0 lg:p-6",
              reversed ? "lg:border-l" : "lg:border-r",
              project.featured && "lg:p-7",
            )}
          >
            {hasImage ? (
              <ProjectScreenshot
                project={project}
                featured={project.featured}
                direction={index % 2 === 1 ? "right" : "left"}
              />
            ) : (
              <ProductPreview project={project} />
            )}
          </div>

          <div className="flex min-w-0 flex-col p-4 sm:p-7">
            <motion.div className="flex flex-wrap items-center gap-2" {...enter(0)}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {project.category}
              </p>
              {project.internalName ? <Tag>{project.internalName}</Tag> : null}
              {project.secondaryLabel ? (
                <Tag>{project.secondaryLabel}</Tag>
              ) : null}
            </motion.div>

            <motion.h3
              className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl md:text-[1.7rem]"
              {...enter(0.04)}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="mt-3 text-sm leading-relaxed text-muted md:text-[0.95rem]"
              {...enter(0.08)}
            >
              {project.description}
            </motion.p>

            <motion.ul
              className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2"
              {...enter(0.12)}
            >
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] text-ink/85"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div className="mt-5 flex flex-wrap gap-1.5" {...enter(0.16)}>
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </motion.div>

            <motion.div
              className="mt-7 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2 sm:flex sm:flex-row"
              {...enter(0.2)}
            >
              <Button
                href={project.liveUrl}
                external
                className="w-full sm:w-auto"
                aria-label={`Live demo of ${project.title}`}
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                href={project.githubUrl}
                variant="secondary"
                external
                className="w-full sm:w-auto"
                aria-label={`${project.title} on GitHub`}
              >
                <SocialIcon id="github" className="h-4 w-4" />
                GitHub
              </Button>
            </motion.div>
          </div>
        </div>
      </PointerGlow>
    </Reveal>
  );
}
