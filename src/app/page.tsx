import AboutSection from "@/components/about";
import ContactSection from "@/components/contact";
import ContactCTA from "@/components/cta";
import FeaturedSection from "@/components/feature";
import Hero from "@/components/hero";
import ProjectGridHome from "@/components/project-grid-home";
// import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      > */}
      <Hero />
      <ProjectGridHome />
      <FeaturedSection />
      <ContactCTA />
      <AboutSection />
      <ContactSection />
      {/* </motion.div> */}
    </div>
  );
}
