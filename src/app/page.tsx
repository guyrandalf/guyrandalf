"use client";

import AboutSection from "@/components/layout/about";
import ContactSection from "@/components/layout/contact";
import ContactCTA from "@/components/layout/cta";
import FeaturedSection from "@/components/layout/feature";
import Hero from "@/components/layout/hero";
import ProjectGrid from "@/components/projects/project-grid";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="space-y-4 pb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            A collection of projects demonstrating various web development
            concepts and technologies.
          </p>
        </div>
        <ProjectGrid />
        <FeaturedSection />
        <ContactCTA />
        <AboutSection />
        <ContactSection />
      </motion.div>
    </div>
  );
}
