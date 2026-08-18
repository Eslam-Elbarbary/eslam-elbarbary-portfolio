import { EbLogo } from "@/components/branding/eb-logo";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { portfolio } from "@/data/portfolio";
import { isExternalHref } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const availableSocial = portfolio.social.filter((item) => item.available);

  return (
    <footer className="border-t border-line pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-8 sm:pt-10">
      <Container className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <EbLogo size={28} title="EB" />
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              {portfolio.person.fullName}
            </p>
            <p className="text-xs text-muted">{portfolio.person.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {availableSocial.map((item) => (
            <a
              key={item.id}
              href={item.href}
              {...(isExternalHref(item.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink sm:h-9 sm:w-9"
              aria-label={item.label}
            >
              <SocialIcon id={item.id} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Container>
      <Container>
        <p className="mt-5 text-center text-xs text-muted/80 sm:mt-6 sm:text-left">
          © {year} {portfolio.person.fullName}
        </p>
      </Container>
    </footer>
  );
}
