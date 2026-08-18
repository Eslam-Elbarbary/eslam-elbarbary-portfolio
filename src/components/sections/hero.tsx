"use client";

import { ArrowDownRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { HeroVisual } from "@/components/sections/hero-visual";
import { useIntro } from "@/components/layout/intro-context";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { duration, easings } from "@/lib/motion";
import { portfolio } from "@/data/portfolio";
import { isExternalHref } from "@/lib/utils";

export function HeroSection() {
  const reduce = useReducedMotion();
  const { ready } = useIntro();
  const { content, proofPoints, social, resume } = portfolio;
  const availableSocial = social.filter((item) => item.available);
  const show = ready;

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: {
      duration: duration.enter,
      delay: reduce || !show ? 0 : delay,
      ease: easings.premium,
    },
  });

  return (
    <PointerGlow
      id="hero"
      as="section"
      className="relative pt-24 pb-10 md:pt-28 md:pb-12"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute -left-24 top-20 h-56 w-56 rounded-full bg-primary/10 blur-2xl sm:h-72 sm:w-72 sm:blur-3xl" />
        <div className="absolute right-0 top-40 h-48 w-48 rounded-full bg-accent/8 blur-2xl sm:h-64 sm:w-64 sm:blur-3xl" />
      </div>

      <Container className="relative min-w-0">
        <div className="flex min-w-0 flex-col gap-7 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-12 xl:gap-x-16">
          <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
            <motion.p
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent sm:mb-5"
              {...enter(0.04)}
            >
              {content.hero.eyebrow}
            </motion.p>

            <motion.h1
              className="font-display text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              {...enter(0.12)}
            >
              {content.hero.headline}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-xl font-display text-lg text-gradient sm:mt-5 sm:text-xl md:text-2xl"
              {...enter(0.2)}
            >
              {content.hero.statement}
            </motion.p>

            <motion.p
              className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:mt-5 sm:text-base"
              {...enter(0.28)}
            >
              {content.hero.supporting}
            </motion.p>
          </div>

          <motion.div
            className="order-2 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end"
            {...enter(0.24)}
          >
            <HeroVisual />
          </motion.div>

          <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
            <motion.p
              className="font-mono text-xs tracking-wide text-primary-soft"
              {...enter(0.34)}
            >
              {content.hero.techLine}
            </motion.p>

            <motion.div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center" {...enter(0.4)}>
              <Button href={content.hero.primaryCta.href} className="w-full sm:w-auto">
                {content.hero.primaryCta.label}
                <ArrowDownRight className="h-4 w-4" />
              </Button>
              <div className="flex min-w-0 flex-col gap-1">
                <Button
                  href={resume.resumeUrl}
                  variant="secondary"
                  className="w-full sm:w-auto"
                  download
                  aria-label="Download Eslam Elbarbary Resume"
                >
                  <Download className="h-4 w-4" />
                  {content.hero.secondaryCta.label}
                </Button>
              </div>
            </motion.div>

            <motion.div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-7" {...enter(0.46)}>
              {availableSocial.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  {...(isExternalHref(item.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : undefined)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
                  aria-label={item.label}
                >
                  <SocialIcon id={item.id} />
                  {item.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.dl
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-14 sm:grid-cols-3"
          {...enter(0.52)}
        >
          {proofPoints.map((point) => (
            <div key={point.label} className="bg-surface px-5 py-4 sm:px-6 sm:py-6">
              <dt className="font-display text-lg font-semibold text-ink sm:text-2xl">
                {point.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{point.label}</dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </PointerGlow>
  );
}
