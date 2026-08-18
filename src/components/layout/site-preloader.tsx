"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EbLogo } from "@/components/branding/eb-logo";
import { useIntro } from "@/components/layout/intro-context";
import { easings } from "@/lib/motion";
import { portfolio } from "@/data/portfolio";

export function SitePreloader() {
  const reduce = useReducedMotion();
  const { complete } = useIntro();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("intro-pending");
      complete();
      setVisible(false);
    }, reduce ? 600 : 1900);

    return () => window.clearTimeout(timer);
  }, [complete, reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] overflow-hidden"
          initial={false}
          aria-hidden="true"
        >
          {reduce ? (
            <motion.div
              className="absolute inset-0 bg-[#05070B]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easings.premium }}
            />
          ) : (
            <>
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 bg-[#05070B]"
                exit={{ y: "-100%" }}
                transition={{ duration: 0.7, ease: easings.premium }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#05070B]"
                exit={{ y: "100%" }}
                transition={{ duration: 0.7, ease: easings.premium }}
              />
            </>
          )}

          <motion.div
            className="relative z-10 grid h-full place-items-center px-4 sm:px-6"
            exit={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
            transition={{ duration: reduce ? 0.28 : 0.4, ease: easings.premium }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {reduce ? null : <span className="eb-preloader-glow" />}
                <EbLogo
                  size={88}
                  animated={!reduce}
                  title="EB"
                  className="h-16 w-16 sm:h-[88px] sm:w-[88px]"
                />
              </div>
              <p className="eb-preloader-name mt-6 font-display text-xl font-semibold tracking-tight text-ink sm:mt-7 sm:text-2xl md:text-3xl">
                {portfolio.person.fullName}
              </p>
              <p className="eb-preloader-role mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {portfolio.person.role}
              </p>
              {reduce ? null : (
                <div className="mt-8 h-px w-28 overflow-hidden bg-white/10">
                  <span className="eb-preloader-bar block h-full w-full origin-left bg-gradient-to-r from-primary to-accent" />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
