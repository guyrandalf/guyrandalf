import { Loader2, Github } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  spinner: Loader2,
  gitHub: Github,
} as const;
