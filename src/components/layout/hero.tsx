"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Mail, ChevronRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const techStack = [
  "Next.js",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Tailwind CSS",
  "AWS",
  "Supabase",
  "Laravel",
  "Docker",
];

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-24"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          className="space-y-6"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-primary">
              Full Stack Developer
            </h2>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Hola! Randalf here 👋
            </h1>
            <div className="text-xl text-muted-foreground">
              <TypeAnimation
                sequence={[
                  "Building modern web applications",
                  2000,
                  "Creating seamless user experiences",
                  2000,
                  "Architecting scalable solutions",
                  2000,
                ]}
                repeat={Infinity}
              />
            </div>
          </div>

          <p className="max-w-[600px] text-lg text-muted-foreground">
            Passionate about crafting exceptional digital experiences through
            clean code and intuitive design. Specializing in full-stack
            development with modern technologies.
          </p>

          <div className="flex gap-4">
            <Button className="group">
              View Projects
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="group">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="ghost" className="px-3">
              <Github className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tech Stack</p>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-full bg-secondary px-3 py-1 text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Add your image or 3D element here */}
          <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl" />
        </motion.div>
      </div>
    </motion.section>
  );
}
