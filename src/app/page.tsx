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

export default function Home() {
  return (
    <SiteShell>
      <main id="main" className="flex-1">
        <HeroSection />
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
