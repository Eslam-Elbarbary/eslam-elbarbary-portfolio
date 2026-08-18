"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { SkillIcon } from "@/components/ui/skill-icon";
import { easings } from "@/lib/motion";
import type { SkillCategory, SkillItem } from "@/types/portfolio";

const waveViewport = { once: true, amount: 0.2 } as const;

export function SkillCategoryCard({
  category,
}: {
  category: SkillCategory;
}) {
  const reduce = useReducedMotion();
  const compact = useSyncExternalStore(
    subscribeCompact,
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );

  return (
    <article className="surface-card h-full min-w-0 p-5 md:p-6">
      <motion.h3
        className="mb-4 text-sm font-medium tracking-wide text-ink"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: easings.premium }}
      >
        {category.title}
      </motion.h3>
      <motion.ul
        className="flex flex-wrap gap-2"
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={waveViewport}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduce ? 0 : 0.055,
              delayChildren: reduce ? 0 : 0.14,
            },
          },
        }}
      >
        {category.items.map((item, index) => (
          <SkillChip
            key={item.name}
            item={item}
            compact={compact}
            reduce={Boolean(reduce)}
            index={index}
          />
        ))}
      </motion.ul>
    </article>
  );
}

const iconPulse = {
  y: [0, -3, 0],
  scale: [1, 1.05, 1],
  rotate: [0, -2, 0],
};

function SkillChip({
  item,
  compact,
  reduce,
  index,
}: {
  item: SkillItem;
  compact: boolean;
  reduce: boolean;
  index: number;
}) {
  const [settled, setSettled] = useState(false);

  return (
    <motion.li
      variants={
        reduce
          ? undefined
          : {
              hidden: {
                opacity: 0,
                y: 20,
                scale: 0.96,
                x: compact ? (index % 2 === 0 ? -10 : 10) : 0,
              },
              visible: { opacity: 1, y: 0, scale: 1, x: 0 },
            }
      }
      transition={{ duration: 0.45, ease: easings.premium }}
      onAnimationComplete={() => {
        if (!reduce) setSettled(true);
      }}
    >
      <PointerGlow className="skill-chip group/skill inline-flex items-center gap-2 rounded-full border border-line bg-elevated/50 px-2.5 py-1.5 text-[13px] text-ink/90">
        <motion.span
          className="skill-chip-icon inline-flex"
          initial={false}
          animate={!reduce && settled ? iconPulse : { y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 0.38, ease: easings.premium }}
        >
          <SkillIcon name={item.name} icon={item.icon} />
        </motion.span>
        <span className="skill-chip-label">{item.name}</span>
      </PointerGlow>
    </motion.li>
  );
}

function subscribeCompact(onStoreChange: () => void) {
  const media = window.matchMedia("(max-width: 639px)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}
