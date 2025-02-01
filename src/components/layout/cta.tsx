"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Let's Build Something Together
        </h2>
        <p className="mt-4 text-muted-foreground">
          Open for collaboration and new opportunities
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>

          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
