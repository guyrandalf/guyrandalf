import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "auth",
    title: "Authentication Form",
    description:
      "A reusable authentication form with email/password and social login support.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Zod"],
    github: "https://github.com/yourusername/auth-form",
    category: "auth",
  },
  {
    id: "filter-search",
    title: "Search & Filter Component",
    description:
      "A search and filter UI for refining displayed data dynamically.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    github: "https://github.com/yourusername/filter-search",
    category: "ui",
  },
  {
    id: "pagination-ui",
    title: "Pagination Component",
    description:
      "A customizable pagination component for handling large data sets.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/pagination-ui",
    category: "ui",
  },
  {
    id: "table-component",
    title: "Dynamic Table Component",
    description:
      "A responsive and sortable table component for displaying structured data.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    github: "https://github.com/yourusername/table-component",
    category: "ui",
  },
  {
    id: "dashboard-cards",
    title: "Dashboard Card Components",
    description:
      "Reusable card components for displaying statistics in dashboards.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/dashboard-cards",
    category: "dashboard",
  },
  {
    id: "sidebar-navigation",
    title: "Sidebar Navigation Menu",
    description: "A responsive and collapsible sidebar navigation component.",
    tags: ["Next.js", "TypeScript", "Shadcn", "Tailwind CSS"],
    github: "https://github.com/yourusername/sidebar-navigation",
    category: "navigation",
  },
  {
    id: "multi-step-form",
    title: "Multi-Step Form Component",
    description:
      "A step-by-step form wizard with validation and progress tracking.",
    tags: ["Next.js", "TypeScript", "Zod", "Tailwind CSS", "Shadcn"],
    github: "https://github.com/yourusername/multi-step-form",
    category: "forms",
  },
];
