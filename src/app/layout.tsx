import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import Script from "next/script";
import { portfolio } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";
import "./globals.css";

const INTRO_BOOTSTRAP = `(function(){try{document.documentElement.classList.add("intro-pending");window.setTimeout(function(){document.documentElement.classList.remove("intro-pending");},3200);}catch(e){}})();`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const metadataBase = isPlaceholder(portfolio.meta.siteUrl)
  ? undefined
  : new URL(portfolio.meta.siteUrl);

export const metadata: Metadata = {
  title: portfolio.meta.title,
  description: portfolio.meta.description,
  applicationName: portfolio.person.fullName,
  authors: [{ name: portfolio.person.fullName }],
  creator: portfolio.person.fullName,
  keywords: [
    "Front-End Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Eslam Elbarbary",
  ],
  ...(metadataBase ? { metadataBase } : {}),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: portfolio.meta.title,
    description: portfolio.meta.description,
    type: "website",
    locale: "en_US",
    siteName: portfolio.person.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.meta.title,
    description: portfolio.meta.description,
  },
  icons: {
    icon: [{ url: "/branding/eb-mark.svg", type: "image/svg+xml" }],
    shortcut: ["/branding/eb-mark.svg"],
    apple: [{ url: "/branding/eb-mark.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-background font-sans text-ink">
        <Script id="intro-bootstrap" strategy="beforeInteractive">
          {INTRO_BOOTSTRAP}
        </Script>
        {children}
      </body>
    </html>
  );
}
