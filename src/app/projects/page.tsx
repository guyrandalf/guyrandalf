"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/container";
import ProjectGrid from "@/components/project-grid";

export default function ProjectsPage() {
  return (
    <div className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">All Projects</h1>
          <p className="text-xl text-muted-foreground">
            Browse through all my projects and experiments
          </p>
        </motion.div>

        <div className="mt-12">
          <ProjectGrid />
        </div>
      </Container>
    </div>
  );
}
