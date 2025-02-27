import AboutSection from "@/components/about";
import ContactSection from "@/components/contact";
import ContactCTA from "@/components/cta";
import FeaturedSection from "@/components/feature";
import Hero from "@/components/hero";
import ProjectGridHome from "@/components/project-grid-home";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />
      <ProjectGridHome />
      <FeaturedSection />
      <ContactCTA />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
