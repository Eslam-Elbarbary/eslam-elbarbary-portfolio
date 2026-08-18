"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { duration, easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type VisualRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
};

export function VisualReveal({
  children,
  className,
  direction = "left",
}: VisualRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const play = Boolean(!reduce && inView);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className={cn(play && "screenshot-settle")}>{children}</div>
      {reduce ? null : (
        <span
          aria-hidden
          className={cn(
            "screenshot-wipe pointer-events-none absolute inset-0 z-10 bg-elevated",
            direction === "right" ? "screenshot-wipe-rtl" : "screenshot-wipe-ltr",
            play && "is-active",
          )}
        />
      )}
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  y = 18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "li";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Component = { div: motion.div, article: motion.article, li: motion.li }[as];

  return (
    <Component
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: duration.enter,
        delay: reduce ? 0 : delay,
        ease: easings.premium,
      }}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  interval = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  interval?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : interval,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }
      }
      transition={{ duration: duration.enter, ease: easings.premium }}
    >
      {children}
    </motion.div>
  );
}
