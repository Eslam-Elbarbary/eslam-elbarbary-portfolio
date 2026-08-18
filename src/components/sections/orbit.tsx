"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EbLogo } from "@/components/branding/eb-logo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { easings } from "@/lib/motion";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { OrbitItem } from "@/types/portfolio";

export function OrbitSection() {
  const reduce = useReducedMotion();
  const { orbit } = portfolio.content;
  const inner = portfolio.orbitItems.filter((item) => item.ring === "inner");
  const outer = portfolio.orbitItems.filter((item) => item.ring === "outer");
  const [armed, setArmed] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered || reduce) return;
    const timer = window.setTimeout(() => setArmed(true), 920);
    return () => window.clearTimeout(timer);
  }, [entered, reduce]);

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={orbit.eyebrow}
          title={orbit.title}
          description={orbit.description}
          align="center"
          className="mx-auto"
        />

        {reduce ? (
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {portfolio.orbitItems.map((item) => (
              <li key={item.id}>
                <OrbitMark item={item} staticLabel />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <motion.div
              className="orbit-stage relative mx-auto mt-10 hidden aspect-square w-full max-w-[min(100%,520px)] md:block lg:max-w-[580px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              onViewportEnter={() => setEntered(true)}
            >
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/25" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/20" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.18),transparent_70%)] blur-lg lg:h-40 lg:w-40 lg:blur-xl" />

              <OrbitRing
                items={inner}
                insetClass="top-[22%]"
                spinClass="orbit-spin"
                counterClass="orbit-counter"
                delay={0.18}
                armed={armed}
              />
              <OrbitRing
                items={outer}
                insetClass="top-[8%]"
                spinClass="orbit-spin-reverse"
                counterClass="orbit-counter-reverse"
                delay={0.32}
                armed={armed}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-line bg-surface/90 shadow-[0_12px_40px_-20px_rgb(99_102_241_/_0.7)]"
                initial={{ opacity: 0, scale: 0.86 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easings.premium }}
              >
                <EbLogo size={32} title="EB" />
              </motion.div>
            </motion.div>

            <div className="logo-marquee relative mt-10 overflow-hidden md:hidden">
              <div className="logo-marquee-track flex w-max gap-3">
                {[...portfolio.orbitItems, ...portfolio.orbitItems].map((item, index) => (
                  <OrbitMark
                    key={`${item.id}-${index}`}
                    item={item}
                    staticLabel
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}

function OrbitRing({
  items,
  insetClass,
  spinClass,
  counterClass,
  delay,
  armed,
}: {
  items: OrbitItem[];
  insetClass: string;
  spinClass: string;
  counterClass: string;
  delay: number;
  armed: boolean;
}) {
  return (
    <motion.div
      className={cn("absolute inset-0", armed && spinClass)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: easings.premium }}
    >
      {items.map((item, index) => {
        const angle = (360 / items.length) * index;
        return (
          <div
            key={item.id}
            className="absolute inset-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className={cn("absolute left-1/2 -translate-x-1/2 -translate-y-1/2", insetClass)}>
              <motion.div
                className={armed ? counterClass : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: delay + 0.12 + index * 0.06,
                  ease: easings.premium,
                }}
              >
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <OrbitMark item={item} />
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

function OrbitMark({
  item,
  staticLabel = false,
}: {
  item: OrbitItem;
  staticLabel?: boolean;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${item.title} website`}
      className="group relative flex items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-soft"
    >
      <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-elevated/90 shadow-[0_10px_24px_-16px_rgb(0_0_0_/_0.9)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 md:h-14 md:w-14">
        {item.logo ? (
          <Image
            src={item.logo}
            alt=""
            fill
            sizes="56px"
            className="object-contain p-1.5"
          />
        ) : (
          // TODO: replace initials badge with an official local logo asset when available.
          <span className="font-display text-sm font-semibold text-gradient">
            {item.initials}
          </span>
        )}
      </span>
      {staticLabel ? (
        <span className="max-w-[9.5rem] pr-2 md:hidden">
          <span className="block truncate text-sm font-medium text-ink">{item.title}</span>
          <span className="block truncate text-[11px] text-muted">{item.category}</span>
        </span>
      ) : (
        <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.55rem)] z-20 hidden w-36 -translate-x-1/2 rounded-xl border border-line bg-surface/95 px-3 py-2 text-center opacity-0 shadow-[0_16px_40px_-24px_rgb(0_0_0_/_0.8)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
          <span className="block truncate text-sm font-medium text-ink">{item.title}</span>
          <span className="mt-0.5 block truncate text-[11px] text-muted">{item.category}</span>
          <span className="mt-1 inline-flex items-center justify-center gap-1 text-[11px] text-accent">
            View Website
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </span>
      )}
    </a>
  );
}
