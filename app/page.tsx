import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { getLatestPosts } from "@/lib/posts";
// import { ParticlesBackground } from "@/components/particles-background"; // 暂时禁用粒子背景

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      <ThemeToggle />
      <div className="relative">
        {/* <ParticlesBackground /> */} {/* 暂时禁用粒子背景 */}
        <HeroSection />
      </div>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection latestPosts={latestPosts} />
      <ContactSection />
    </main>
  );
}

