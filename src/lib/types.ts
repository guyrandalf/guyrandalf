export type ProjectCategory =
  | "auth"
  | "payment"
  | "dashboard"
  | "chat"
  | "cms"
  | "search";

export interface Project {
  id: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  image: string;
  category: ProjectCategory;
}
