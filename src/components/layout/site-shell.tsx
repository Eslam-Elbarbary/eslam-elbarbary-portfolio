import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { IntroProvider } from "@/components/layout/intro-context";
import { SitePreloader } from "@/components/layout/site-preloader";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";

type SiteShellProps = {
  children: React.ReactNode;
  resumeAvailable: boolean;
};

export function SiteShell({ children, resumeAvailable }: SiteShellProps) {
  return (
    <IntroProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <SitePreloader />
      <Navbar resumeAvailable={resumeAvailable} />
      <div className="flex min-h-full min-w-0 flex-1 flex-col">{children}</div>
      <Footer />
      <WhatsAppFab />
    </IntroProvider>
  );
}
