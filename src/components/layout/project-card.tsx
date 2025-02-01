"use client";

import { Project } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Link
            href={project.demo}
            className="flex items-center text-sm hover:text-primary"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </Link>
          {project.github && (
            <Link
              href={project.github}
              className="flex items-center text-sm hover:text-primary"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
