"use client";

import { motion } from "framer-motion";
import { Code2, Database, Cloud, Lock, Terminal, Github } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, and modern web APIs",
  },
  {
    icon: Database,
    title: "Backend Systems",
    description: "Node.js, PostgreSQL, and RESTful API design",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "AWS, Vercel, and containerized deployments",
  },
  {
    icon: Lock,
    title: "Authentication & Security",
    description: "JWT, OAuth2, and secure user management",
  },
  {
    icon: Terminal,
    title: "DevOps Practices",
    description: "CI/CD pipelines and automated testing",
  },
  {
    icon: Github,
    title: "Version Control",
    description: "Git workflow and collaborative development",
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-12 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight">
          Technical Expertise
        </h2>
        <p className="text-muted-foreground">
          Specialized in modern web development technologies and practices
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group space-y-4 rounded-lg border p-6 transition-colors hover:border-primary"
          >
            <feature.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
