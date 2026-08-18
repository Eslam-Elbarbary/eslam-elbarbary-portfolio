"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EbLogo } from "@/components/branding/eb-logo";
import { useIntro } from "@/components/layout/intro-context";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

type NavbarProps = {
  resumeAvailable: boolean;
};

export function Navbar({ resumeAvailable }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 16,
    () => false,
  );
  const reduce = useReducedMotion();
  const { ready } = useIntro();
  const menuId = useId();
  const { person, nav, resume } = portfolio;

  useEffect(() => {
    let lastNearBottom = false;

    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (nearBottom !== lastNearBottom) {
        lastNearBottom = nearBottom;
        if (nearBottom) setActive("#contact");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...nav.map((item) => item.href.slice(1))];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 120;
        if (nearBottom) {
          setActive("#contact");
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[320ms]",
        scrolled || open
          ? "border-b border-line bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-ink"
          aria-label={`${person.fullName} home`}
        >
          <span className="relative grid place-items-center">
            <span className="pointer-events-none absolute inset-[-6px] rounded-xl bg-primary/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <EbLogo
              size={28}
              className="relative transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
              title="EB"
            />
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:inline">
            {person.fullName}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-primary to-accent"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={resume.href}
            variant="secondary"
            className="h-9 px-4 text-[13px]"
            download
            disabled={!resumeAvailable}
            disabledLabel="Resume PDF will be available soon"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overflow-x-hidden border-t border-line bg-background/95 lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "min-h-11 rounded-lg px-3 py-3 text-base",
                    active === item.href ? "bg-elevated text-ink" : "text-muted",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 pt-3">
                <Button
                  href={resume.href}
                  variant="primary"
                  className="w-full"
                  download
                  disabled={!resumeAvailable}
                  disabledLabel="Resume PDF will be available soon"
                >
                  <Download className="h-4 w-4" />
                  {resume.label}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
