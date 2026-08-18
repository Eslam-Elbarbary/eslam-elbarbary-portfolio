"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WordPressCard } from "@/components/sections/wordpress-card";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";

export function WordPressGallery() {
  const { otherWork } = portfolio.content;
  const projects = useMemo(
    () =>
      [...portfolio.wordpressProjects].sort(
        (a, b) => a.priority - b.priority,
      ),
    [],
  );
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const featured = projects.filter((item) => item.featured);
  const rest = projects.filter((item) => !item.featured);
  const initialRestCount = Math.max(0, otherWork.initialCount - featured.length);
  const initialRest = rest.slice(0, initialRestCount);
  const extraRest = rest.slice(initialRestCount);

  return (
    <div className="mt-10">
      <ul className="grid gap-4 md:grid-cols-2">
        {featured.map((project, index) => (
          <motion.li
            key={project.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <WordPressCard
              project={project}
              featured
              priority={index < 2}
            />
          </motion.li>
        ))}
      </ul>

      <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {initialRest.map((project, index) => (
          <motion.li
            key={project.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.16), ease: [0.22, 1, 0.36, 1] }}
          >
            <WordPressCard project={project} />
          </motion.li>
        ))}
        <AnimatePresence initial={false}>
          {expanded
            ? extraRest.map((project, index) => (
                <motion.li
                  key={project.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.32,
                    delay: reduce ? 0 : Math.min(index * 0.04, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <WordPressCard project={project} />
                </motion.li>
              ))
            : null}
        </AnimatePresence>
      </ul>

      {extraRest.length ? (
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? otherWork.showLessLabel : otherWork.viewMoreLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
