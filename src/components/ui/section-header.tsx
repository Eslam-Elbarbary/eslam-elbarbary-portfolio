"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <motion.p
        className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: duration.fast, ease: easings.premium }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="font-display text-[1.7rem] font-semibold tracking-tight text-balance text-ink sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: duration.enter, delay: reduce ? 0 : 0.08, ease: easings.premium }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-[1.05rem]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: duration.enter, delay: reduce ? 0 : 0.14, ease: easings.premium }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
