import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "auth",
    title: "Authentication Form",
    description:
      "A reusable authentication form with email/password and social login support.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Zod"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/auth",
    category: "auth",
  },
  {
    id: "filter-search",
    title: "Search & Filter Component",
    description:
      "A search and filter UI for refining displayed data dynamically.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/filter-search",
    category: "ui",
  },
  {
    id: "pagination-ui",
    title: "Pagination Component",
    description:
      "A customizable pagination component for handling large data sets.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/guyrandalf/guyrandalf/tree/main/src/app/projects/pagination-ui",
    category: "ui",
  },
  {
    id: "todo-crud",
    title: "Todo List with CRUD",
    description:
      "A full-stack todo list app with create, read, update, and delete operations, stored in a database.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/yourusername/todo-crud",
    category: "fullstack",
  },
  {
    id: "real-time-chat",
    title: "Real-Time Chat",
    description:
      "A chat component with real-time messaging using Supabase’s real-time database subscriptions.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "WebSocket"],
    github: "https://github.com/yourusername/real-time-chat",
    category: "fullstack",
  },
  {
    id: "file-upload",
    title: "File Upload Manager",
    description:
      "A file upload system with server-side storage and retrieval using Supabase storage and Prisma metadata tracking.",
    tags: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind CSS"],
    github: "https://github.com/yourusername/file-upload",
    category: "fullstack",
  },
  {
    id: "user-dashboard",
    title: "User Dashboard",
    description:
      "A dashboard displaying user-specific data (e.g., profile, stats) fetched from a server API with role-based access.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "Server Actions"],
    github: "https://github.com/yourusername/user-dashboard",
    category: "fullstack",
  },
  {
    id: "api-crud",
    title: "RESTful API CRUD Interface",
    description:
      "A UI for interacting with a custom Next.js API route for CRUD operations on a resource (e.g., blog posts).",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "API Routes"],
    github: "https://github.com/yourusername/api-crud",
    category: "fullstack",
  },
  {
    id: "notifications",
    title: "Notification System",
    description:
      "A notification component with server-side generation and client-side polling or real-time updates.",
    tags: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind CSS"],
    github: "https://github.com/yourusername/notifications",
    category: "fullstack",
  },
  {
    id: "ecommerce-cart",
    title: "E-commerce Cart",
    description:
      "A shopping cart with server-side session management and database-backed order tracking.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "Server Actions"],
    github: "https://github.com/yourusername/ecommerce-cart",
    category: "fullstack",
  },
];