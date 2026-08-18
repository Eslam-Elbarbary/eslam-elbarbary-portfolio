import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SocialIcon } from "@/components/ui/social-icon";
import { getSocial, portfolio } from "@/data/portfolio";
import { cn, isExternalHref } from "@/lib/utils";
import type { SocialLink } from "@/types/portfolio";

function contactValue(item: SocialLink) {
  if (item.id === "linkedin") return "/in/eslamelbarbarydev";
  if (item.id === "github") return "/Eslam-Elbarbary";
  return item.display;
}

export function ContactSection() {
  const { contact } = portfolio.content;
  const whatsapp = getSocial("whatsapp");
  const email = getSocial("email");

  return (
    <Section id="contact" className="pb-[max(5.5rem,calc(4.5rem+env(safe-area-inset-bottom)))] sm:pb-20 md:pb-28">
      <Container>
        <Reveal>
          <div className="relative rounded-[1.5rem] border border-line bg-[linear-gradient(160deg,rgb(99_102_241_/_0.08),transparent_42%),linear-gradient(var(--color-surface),var(--color-surface))] px-4 py-7 sm:px-6 sm:py-12 md:rounded-[1.75rem] md:px-12 md:py-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {contact.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-balance text-ink sm:mt-4 sm:text-4xl md:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
              {contact.supporting}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              {whatsapp?.available ? (
                <Button
                  href={whatsapp.href}
                  external
                  className="w-full sm:w-auto"
                  aria-label="Let's Talk on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                  {contact.primaryCtaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              ) : null}
              {email?.available ? (
                <Button href={email.href} variant="secondary" className="hidden sm:inline-flex">
                  Email
                </Button>
              ) : null}
            </div>

            <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:mt-10 sm:gap-3 md:grid-cols-2">
              {portfolio.social.map((item) => (
                <li key={item.id} className="min-w-0">
                  {item.available ? (
                    <a
                      href={item.href}
                      {...(isExternalHref(item.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : undefined)}
                      className="group/link flex min-h-[4.05rem] items-center gap-3 rounded-2xl border border-line bg-background/60 px-3 py-3 sm:min-h-[4.25rem] sm:px-4 sm:py-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-elevated text-ink">
                        <SocialIcon id={item.id} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">
                          {item.label}
                        </span>
                        <span className="block truncate text-[13px] text-muted">
                          {contactValue(item)}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  ) : (
                    <div
                      className={cn(
                        "flex min-h-16 items-center gap-3 rounded-2xl border border-dashed border-line bg-background/40 px-3 py-3",
                      )}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-elevated text-muted">
                        <SocialIcon id={item.id} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-ink">
                          {item.label}
                        </span>
                        <span className="block text-[13px] text-muted">
                          To be added
                        </span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
