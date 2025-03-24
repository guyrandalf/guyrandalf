import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Authentication Form",
    slug: "auth",
    description:
      "A reusable authentication form with email/password and social login support.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Zod"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/auth",
    category: "auth",
  },
  {
    id: 2,
    title: "Referral Lead Connector",
    slug: "referrals",
    description:
      "A simple demo of submitting and matching service leads, inspired by Baton Leads' referral network.",
    tags: ["Next.js", "TypeScript", "Postgresql", "Tailwind CSS", "Supabase"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/referrals",
    category: "referrals",
  },
  {
    id: 3,
    title: "Search & Filter Component",
    slug: "filter-search",
    description:
      "A search and filter UI for refining displayed data dynamically.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/filter-search",
    category: "search",
  },
  {
    id: 4,
    title: "Pagination Component",
    slug: "pagination-ui",
    description:
      "A customizable pagination component for handling large data sets.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/pagination-ui",
    category: "ui",
  },
  {
    id: 5,
    title: "Todo List with CRUD",
    slug: "todo-crud",
    description:
      "A full-stack todo list app with create, read, update, and delete operations, stored in a database.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/yourusername/todo-crud",
    category: "fullstack",
  },
  {
    id: 6,
    title: "Real-Time Chat",
    slug: "real-time-chat",
    description:
      "A chat component with real-time messaging using Supabase’s real-time database subscriptions.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "WebSocket"],
    github: "https://github.com/yourusername/real-time-chat",
    category: "chat",
  },
];