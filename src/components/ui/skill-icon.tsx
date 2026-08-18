import type { SVGProps } from "react";
import {
  Braces,
  Bug,
  Code2,
  GitBranch,
  Globe,
  Layers,
  Route,
  ScanSearch,
  Smartphone,
  Sparkles,
  SquareCode,
  Workflow,
} from "lucide-react";


type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const icons: Record<string, (props: IconProps) => React.ReactNode> = {
  react: (props) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="#61DAFB"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="#61DAFB"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
    </Svg>
  ),
  nextjs: (props) => (
    <Svg {...props} fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.6 15.4-.9-1.4A6.3 6.3 0 0 1 9 17.2V8.4h1.7v6.6a4.6 4.6 0 0 0 4.2-1.3l.7 1.1Z" />
    </Svg>
  ),
  javascript: (props) => (
    <Svg {...props}>
      <rect width="20" height="20" x="2" y="2" rx="3" fill="#F7DF1E" />
      <path
        d="M10.1 16.6c0 1.4-.8 2.2-2.2 2.2-1.2 0-2-.6-2.4-1.4l1.2-.7c.2.4.5.8 1.1.8.5 0 .8-.2.8-.9v-4.2h1.5v4.2Zm3.6 2.2c-1.5 0-2.5-.7-3-1.7l1.2-.7c.3.6.8 1.1 1.7 1.1.7 0 1.2-.4 1.2-.9 0-.6-.5-.8-1.4-1.2l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.9 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.7 1.5l-1.2.8c-.3-.5-.7-.7-1.5-.7-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.2l.5.2c1.6.7 2.5 1.4 2.5 3 0 1.7-1.3 2.6-3.1 2.6Z"
        fill="#111"
      />
    </Svg>
  ),
  typescript: (props) => (
    <Svg {...props}>
      <rect width="20" height="20" x="2" y="2" rx="3" fill="#3178C6" />
      <path
        fill="#fff"
        d="M13.7 17.3v-1.4c.4.2.8.4 1.5.4.5 0 .8-.2.8-.5 0-.3-.2-.5-.9-.7l-.7-.2c-1.2-.3-2-.9-2-2.1 0-1.2.9-2.1 2.4-2.1.7 0 1.4.1 2 .4v1.4c-.4-.2-.9-.4-1.5-.4-.5 0-.7.2-.7.5 0 .3.2.5 1 .7l.6.2c1.4.4 2.1 1 2.1 2.2 0 1.3-1 2.2-2.6 2.2-.8 0-1.6-.2-2.3-.6ZM6.6 11.3h3.3v1.1H8.4V18H6.9v-5.6H6.6v-1.1Z"
      />
    </Svg>
  ),
  html: (props) => (
    <Svg {...props}>
      <path fill="#E44D26" d="M4.5 3h15l-1.4 16.1L12 21.2 5.9 19.1Z" />
      <path fill="#F16529" d="M12 4.2V20l5.2-1.5L18.4 4.2Z" />
      <path
        fill="#EBEBEB"
        d="m8.2 8.2 7.6-.1-.3 2.6H9.8l.2 2.3h5.3l-.4 3.2L12 17.1l-2.9-.8-.2-2h2l.1 1 1 .3 1-.3.2-1.6H8.8Z"
      />
    </Svg>
  ),
  css: (props) => (
    <Svg {...props}>
      <path fill="#1572B6" d="M4.5 3h15l-1.4 16.1L12 21.2 5.9 19.1Z" />
      <path fill="#33A9DC" d="M12 4.2V20l5.2-1.5L18.4 4.2Z" />
      <path
        fill="#fff"
        d="M8.3 8.1h7.5l-.2 2.2H10.3l.1 1.4h4.9l-.5 4.4L12 17.1l-2.7-.8-.2-1.8h1.9l.1.8 1 .3 1-.3.2-1.8H8.5Z"
      />
    </Svg>
  ),
  jquery: (props) => (
    <Svg {...props}>
      <path
        fill="#0769AD"
        d="M4.2 16.4c4.8 4.6 9.8 1.6 12-1.4 2-2.6 2.7-5.4 2.7-5.4s-1.6 2.3-5.6 3.5c-4.7 1.4-8.4-.6-9.1-3.3 2.5 3.4 6.2 3.8 8.9 2.6 0 0-3.4-1.7-5.4-5.3C6.1 4.1 7.2 2.3 7.2 2.3s-4.6 3.2-3 14.1Z"
      />
    </Svg>
  ),
  tailwind: (props) => (
    <Svg {...props}>
      <path
        fill="#38BDF8"
        d="M12 6.5c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.5.7.2 1.3.7 1.8 1.4.9 1.2 1.9 2.6 4.8 2.6 2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.5-.7-.2-1.3-.7-1.8-1.4C15.9 7.9 14.9 6.5 12 6.5Zm-5 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.5.7.2 1.3.7 1.8 1.4.9 1.2 1.9 2.6 4.8 2.6 2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.5-.7-.2-1.3-.7-1.8-1.4-1-.1-1.9-2.6-4.8-2.6Z"
      />
    </Svg>
  ),
  bootstrap: (props) => (
    <Svg {...props}>
      <rect width="18" height="18" x="3" y="3" rx="4" fill="#7952B3" />
      <path
        fill="#fff"
        d="M12.4 7.2H9.2v9.6h3.3c2.5 0 4-1.3 4-3.4 0-1.5-.9-2.5-2.2-2.8v-.1c1-.4 1.6-1.2 1.6-2.3 0-1.8-1.4-3-3.5-3Zm-.2 4.2H10.7V8.6h1.5c1.2 0 1.9.5 1.9 1.4s-.7 1.4-1.9 1.4Zm.3 4H10.7v-3.1h1.8c1.4 0 2.1.6 2.1 1.6s-.8 1.5-2.1 1.5Z"
      />
    </Svg>
  ),
  sass: (props) => (
    <Svg {...props}>
      <path
        fill="#CD6799"
        d="M16.4 13.3c-.8.3-1.5.1-2 .4-.2.1-.4.4-.3.6.3.6 2 .4 2.8-.1 1.1-.6 1.3-1.8.6-2.5-.9-.9-2.4-.5-4 .1-2 1-4.4 2.3-6.1 1.4-1.5-.8-1.8-3.3-.3-5.4 1.4-1.9 3.6-2.6 4.9-2.5.4-1.3 1-2.4 2-3.1C15.3.8 17.2.9 18 2c.9 1.3.3 3.3-1.3 4.8.2.6.3 1.3.3 2 0 2.5-1.5 5-3.6 6.3-2 1.3-4.4 1.5-5.8.4-1.5-1.2-1.8-3.3-.7-5.1 1-1.6 2.8-2.6 3.8-2.3.2 1.3.1 2.7-.4 3.8-.3.7-.8 1.2-1.2 1.2-.3 0-.5-.3-.4-.8.1-.6.5-1.2.4-1.8-.1-.5-.6-.6-1.1-.3-1 .6-1.7 2.2-1.1 3.6.6 1.5 2.3 2 3.9 1.3 2.1-.9 3.6-3.6 3.4-6.3 0-.5-.1-1-.2-1.4 1.3-1.2 2-2.5 1.5-3.3-.4-.6-1.5-.6-2.5 0-.7.4-1.2 1.1-1.5 2-1.2.2-2.5.8-3.6 1.8-1.9 1.8-2.5 4.3-1.4 6 1.2 1.8 3.7 2.4 6.3 1.3 1.4-.6 2.6-1.6 3.4-2.7Z"
      />
    </Svg>
  ),
  figma: (props) => (
    <Svg {...props}>
      <path fill="#0ACF83" d="M12 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
      <path fill="#A259FF" d="M6 12a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Z" />
      <path fill="#F24E1E" d="M12 3h3a3 3 0 1 1 0 6h-3V3Z" />
      <path fill="#FF7262" d="M6 6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Z" />
      <path fill="#1ABCFE" d="M12 9h3a3 3 0 1 1 0 6h-3V9Z" />
    </Svg>
  ),
  vite: (props) => (
    <Svg {...props}>
      <path fill="#FFD62E" d="m12 3 9.5 16.5H2.5Z" />
      <path fill="#BD34FE" d="M12 3 3.4 18.4h4.1L12 8.7l4.5 9.7h4.1Z" />
    </Svg>
  ),
  npm: (props) => (
    <Svg {...props}>
      <path fill="#CB3837" d="M4 6h16v12H12v-9H8v9H4Z" />
      <path fill="#fff" d="M8 9h4v9H8z" />
    </Svg>
  ),
  git: (props) => (
    <Svg {...props}>
      <path
        fill="#F05032"
        d="M21.2 11 13 .8a1.2 1.2 0 0 0-1.8 0L9.3 2.8l2.3 2.3a1.7 1.7 0 0 1 2.1 2.1l2.2 2.2a1.7 1.7 0 1 1-1 1l-2.2-2.2v5.8a1.7 1.7 0 1 1-1.4.1V8.1a1.7 1.7 0 0 1-.9-2.2L7.9 3.6.8 10.7a1.2 1.2 0 0 0 0 1.8l10.2 10.2a1.2 1.2 0 0 0 1.8 0L21.2 13a1.2 1.2 0 0 0 0-1.9Z"
      />
    </Svg>
  ),
  github: (props) => (
    <Svg {...props} fill="currentColor">
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z" />
    </Svg>
  ),
  node: (props) => (
    <Svg {...props}>
      <path
        fill="#5FA04E"
        d="M11.4 2.2 4.3 6.3v8.2l7.1 4.1 7.2-4.1V6.3l-7.2-4.1Zm.6 2 5 2.9v5.8l-5 2.9-5-2.9V7.1l5-2.9Z"
      />
    </Svg>
  ),
  express: (props) => (
    <Svg {...props} fill="currentColor">
      <path d="M3 11.2h2.6c.5 0 .8.1 1 .4.2.2.3.6.3 1 0 .5-.1.8-.4 1-.3.3-.7.4-1.2.4H4.3V16H3v-4.8Zm1.3 1.1v1.3h1c.5 0 .8-.2.8-.7s-.3-.6-.8-.6h-1ZM8.2 11.2h1.3l1.5 3.7h.1l1.5-3.7H14l-2.3 4.8H9.5L8.2 11.2Zm7.6 0H21v1.1h-3.9v.8h3.5v1h-3.5v.8H21V16h-5.2v-4.8ZM3.4 17.2h1.4l1.2 2.1 1.2-2.1h1.4l-2 3.2V22H5.4v-1.6l-2-3.2Z" />
    </Svg>
  ),
  mysql: (props) => (
    <Svg {...props}>
      <path
        fill="#4479A1"
        d="M16.8 8.4c-1 .1-1.8.3-2.4.7-.2.1-.4 0-.4-.2l-.1-.4c0-.2.1-.3.2-.4.8-.5 1.8-.8 3.1-.8 2.4 0 3.7 1.1 3.7 3.1v6.3h-1.7v-1.1c-.6.8-1.5 1.3-2.7 1.3-1.8 0-3.1-1.2-3.1-2.9 0-2.4 2-3.1 4.6-3.1h1.1v-.4c0-.9-.6-1.4-1.8-1.4h-.5Zm.6 4.3h-.8c-1.4 0-2.4.5-2.4 1.5s.8 1.5 1.9 1.5c1.4 0 2.3-1 2.3-2.3v-.7h-1Z"
      />
      <path
        fill="#E48E00"
        d="M4.6 8.5c1.8 0 3.1.6 3.9 1.8l-1.2.9c-.5-.8-1.3-1.2-2.6-1.2-1.7 0-2.8 1-2.8 2.6 0 1.5 1.1 2.6 2.8 2.6 1.3 0 2.1-.4 2.7-1.3v-1.2H5.6v-1.4h4.2v3.7c-1 1.2-2.4 1.8-4.3 1.8C2.7 16.8.8 14.8.8 12s1.9-4.8 4.8-4.8h-.1Z"
      />
    </Svg>
  ),
  wordpress: (props) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" fill="#21759B" />
      <path
        fill="#fff"
        d="M6.2 12a5.8 5.8 0 0 0 4 5.5L6.8 9.1A5.8 5.8 0 0 0 6.2 12Zm9.7-.4c0-.5 0-.9-.2-1.3s-.6-.5-1-.5-1 .3-1.1 1.2l-1 3.3-1.8-5.4h-1.7L11.3 17a5.8 5.8 0 0 0 3.5.1l-.9-2.5 1.4-3.8.3.9Zm1.9.4a5.8 5.8 0 0 1-2.3 4.6l1.7-4.9c.1-.3.2-.6.2-.8 0-.2 0-.4-.1-.6A5.8 5.8 0 0 1 17.8 12Z"
      />
    </Svg>
  ),
  postman: (props) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" fill="#FF6C37" />
      <path
        fill="#fff"
        d="M8.2 12.4 16 7.6l-3.4 8.1-1.6-2.4-2.8-1Zm2.6.6 1 .8.8-1.8-1.8 1Z"
      />
    </Svg>
  ),
};

const lucideIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  responsive: Smartphone,
  "react-router": Route,
  "react-query": ScanSearch,
  formik: SquareCode,
  context: Layers,
  api: Globe,
  axios: GitBranch,
  fetch: Globe,
  json: Braces,
  apidog: ScanSearch,
  eslint: Sparkles,
  debug: Bug,
  oop: Layers,
  structures: Workflow,
  algorithms: Workflow,
  solve: Code2,
  clean: Sparkles,
};

function Fallback({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-4 w-4 place-items-center rounded-[3px] bg-primary/20 font-mono text-[8px] font-bold text-primary-soft"
    >
      {name.slice(0, 1)}
    </span>
  );
}

export function SkillIcon({ name, icon }: { name: string; icon: string }) {
  const Icon = icons[icon];
  if (Icon) return <Icon className="shrink-0 text-ink" />;
  const LucideIcon = lucideIcons[icon];
  if (LucideIcon) {
    return <LucideIcon className="h-4 w-4 shrink-0 text-primary-soft" />;
  }
  return <Fallback name={name} />;
}
