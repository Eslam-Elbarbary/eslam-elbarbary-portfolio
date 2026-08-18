import { SiteShell } from "@/components/layout/site-shell";
import { AboutSection } from "@/components/sections/about";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { HeroSection } from "@/components/sections/hero";
import { OrbitSection } from "@/components/sections/orbit";
import { OtherWorkSection } from "@/components/sections/other-work";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { portfolio } from "@/data/portfolio";
import { hasResumeFile } from "@/lib/resume";

export default function Home() {
  const resumeAvailable = hasResumeFile(portfolio.resume.href);

  return (
    <SiteShell resumeAvailable={resumeAvailable}>
      <main id="main" className="flex-1">
        <HeroSection resumeAvailable={resumeAvailable} />
        <AboutSection />
        <SkillsSection />
        <OrbitSection />
        <ProjectsSection />
        <OtherWorkSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
    </SiteShell>
  );
}
