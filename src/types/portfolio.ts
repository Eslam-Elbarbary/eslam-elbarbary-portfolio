export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  id: "github" | "linkedin" | "email" | "whatsapp";
  label: string;
  href: string;
  display: string;
  available: boolean;
};

export type ProofPoint = {
  value: string;
  label: string;
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  items: SkillItem[];
};

export type Project = {
  id: string;
  title: string;
  internalName?: string;
  secondaryLabel?: string;
  category: string;
  featured?: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  caseStudyUrl?: string;
};

export type CaptureStatus = "ready" | "manual-required";

export type WordPressProject = {
  id: string;
  title: string;
  category: string;
  liveUrl: string;
  image: string;
  technologies: string[];
  featured?: boolean;
  priority: number;
  captureStatus: CaptureStatus;
  label?: string;
  description?: string;
  imageWidth: number;
  imageHeight: number;
};

export type ExperienceIcon = "briefcase";

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  mode?: string;
  period: string;
  companyUrl?: string;
  summary: string;
  highlights: string[];
  logo?: string;
  icon?: ExperienceIcon;
  current?: boolean;
};

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  gpa?: string;
  period: string;
};

export type Certification = {
  id: string;
  issuer: string;
  title: string;
  period: string;
  completedOn?: string;
  summary?: string;
  topics?: string[];
  curriculum?: string[];
  credentialUrl?: string;
  credentialLabel?: string;
};

export type Person = {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  logoMark: string;
  image: string;
  location?: string;
};

export type Resume = {
  resumeUrl: string;
  label: string;
};

export type SiteMeta = {
  title: string;
  description: string;
  siteUrl: string;
};

export type OrbitItem = {
  id: string;
  title: string;
  category: string;
  url: string;
  logo?: string;
  initials: string;
  ring: "inner" | "outer";
};

export type PortfolioContent = {
  hero: {
    eyebrow: string;
    headline: string;
    statement: string;
    supporting: string;
    techLine: string;
    badges: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string };
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    comingSoon: string;
  };
  orbit: {
    eyebrow: string;
    title: string;
    description: string;
  };
  otherWork: {
    eyebrow: string;
    title: string;
    description: string;
    emptyState: string;
    viewMoreLabel: string;
    showLessLabel: string;
    initialCount: number;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
  };
  education: {
    eyebrow: string;
    title: string;
  };
  certifications: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    supporting: string;
    primaryCtaLabel: string;
  };
};

export type Portfolio = {
  person: Person;
  meta: SiteMeta;
  resume: Resume;
  nav: NavItem[];
  social: SocialLink[];
  proofPoints: ProofPoint[];
  skills: SkillCategory[];
  projects: Project[];
  wordpressProjects: WordPressProject[];
  orbitItems: OrbitItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  content: PortfolioContent;
};
