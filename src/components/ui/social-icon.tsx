import type { SocialLink } from "@/types/portfolio";

type IconProps = {
  className?: string;
};

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.37-1.4a10 10 0 0 0 4.67 1.19h.01c5.46 0 9.89-4.4 9.89-9.85C21.94 6.4 17.5 2 12.04 2Zm5.77 13.99c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.1.11-1.78-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.17-1.55-1.17-2.96 0-1.4.73-2.09 1-2.37.24-.26.64-.38 1.02-.38.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.83 2.02.9 2.17.08.15.12.32.02.52-.1.19-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.28.3-.12.58.16.28.7 1.16 1.5 1.88 1.04.93 1.9 1.22 2.2 1.36.28.13.45.11.62-.07.17-.18.73-.85.93-1.14.2-.29.4-.24.67-.14.28.1 1.75.83 2.05.98.3.15.5.22.57.34.08.13.08.74-.16 1.42Z" />
    </svg>
  );
}

const map = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialIcon({
  id,
  className = "h-4 w-4",
}: {
  id: SocialLink["id"];
  className?: string;
}) {
  const Icon = map[id];
  return <Icon className={className} />;
}
