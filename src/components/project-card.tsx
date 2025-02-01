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
import { Github, ArrowRight } from "lucide-react";

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
      <Card className="group overflow-hidden transition-colors hover:border-primary">
        <Link href={`/projects/${project.id}`} className="block">
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
        </Link>
        <CardFooter className="flex justify-between p-4">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center text-sm text-primary"
          >
            View Demo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              className="flex items-center text-sm hover:text-primary"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
