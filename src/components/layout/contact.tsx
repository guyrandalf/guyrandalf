"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  {
    name: "Email",
    href: "mailto:your@email.com",
    icon: Mail,
    description: "Drop me a line",
  },
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
    description: "Check out my repos",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    description: "Let's connect",
  },
];

export default function ContactSection() {
  return (
    <div className="space-y-12 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">
          Let's collaborate on something great
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {socials.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 transition-colors hover:border-primary">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-4"
              >
                <social.icon className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">{social.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {social.description}
                </p>
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
