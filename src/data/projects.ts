import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "auth",
    title: "Authentication Form",
    description:
      "A reusable authentication form with email/password and social login support.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Zod"],
    github: "https://github.com/yourusername/auth-form",
    image: "/projects/auth-form.png",
    category: "auth",
  },
  {
    id: "input-validation",
    title: "Form Validation with Zod",
    description:
      "A form demonstrating Zod validation for various input fields.",
    tags: ["Next.js", "TypeScript", "Zod", "Shadcn", "Tailwind CSS"],
    github: "https://github.com/yourusername/input-validation",
    image: "/projects/input-validation.png",
    category: "forms",
  },
  {
    id: "toast-notifications",
    title: "Toast Notifications",
    description: "A reusable toast notification system using Shadcn.",
    longDescription:
      "A component to display success, error, and warning messages with smooth animations.",
    tags: ["Next.js", "TypeScript", "Shadcn", "Tailwind CSS"],
    demo: "/projects/toast-notifications",
    github: "https://github.com/yourusername/toast-notifications",
    image: "/projects/toast-notifications.png",
    category: "ui",
  },
  {
    id: "modal-component",
    title: "Custom Modal Component",
    description:
      "A reusable modal component with animations and accessibility support.",
    longDescription:
      "A fully responsive and accessible modal component built with Shadcn and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Shadcn", "Tailwind CSS"],
    demo: "/projects/modal-component",
    github: "https://github.com/yourusername/modal-component",
    image: "/projects/modal-component.png",
    category: "ui",
  },
  {
    id: "pagination-ui",
    title: "Pagination Component",
    description:
      "A customizable pagination component for handling large data sets.",
    longDescription:
      "A reusable pagination component with Next.js and Tailwind CSS for seamless navigation.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "/projects/pagination-ui",
    github: "https://github.com/yourusername/pagination-ui",
    image: "/projects/pagination-ui.png",
    category: "ui",
  },
  {
    id: "table-component",
    title: "Dynamic Table Component",
    description:
      "A responsive and sortable table component for displaying structured data.",
    longDescription:
      "A fully featured table with sorting, filtering, and pagination using Prisma.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    demo: "/projects/table-component",
    github: "https://github.com/yourusername/table-component",
    image: "/projects/table-component.png",
    category: "ui",
  },
  {
    id: "dashboard-cards",
    title: "Dashboard Card Components",
    description:
      "Reusable card components for displaying statistics in dashboards.",
    longDescription:
      "A set of dynamic cards for displaying analytics and data-driven metrics.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "/projects/dashboard-cards",
    github: "https://github.com/yourusername/dashboard-cards",
    image: "/projects/dashboard-cards.png",
    category: "dashboard",
  },
  {
    id: "filter-search",
    title: "Search & Filter Component",
    description:
      "A search and filter UI for refining displayed data dynamically.",
    longDescription:
      "A reusable search and filtering system for product listings or large datasets.",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    demo: "/projects/filter-search",
    github: "https://github.com/yourusername/filter-search",
    image: "/projects/filter-search.png",
    category: "ui",
  },
  {
    id: "sidebar-navigation",
    title: "Sidebar Navigation Menu",
    description: "A responsive and collapsible sidebar navigation component.",
    longDescription:
      "A flexible sidebar navigation system with multi-level support for dashboards.",
    tags: ["Next.js", "TypeScript", "Shadcn", "Tailwind CSS"],
    demo: "/projects/sidebar-navigation",
    github: "https://github.com/yourusername/sidebar-navigation",
    image: "/projects/sidebar-navigation.png",
    category: "navigation",
  },
  {
    id: "multi-step-form",
    title: "Multi-Step Form Component",
    description:
      "A step-by-step form wizard with validation and progress tracking.",
    longDescription:
      "A dynamic multi-step form for user registrations and complex data inputs.",
    tags: ["Next.js", "TypeScript", "Zod", "Tailwind CSS", "Shadcn"],
    demo: "/projects/multi-step-form",
    github: "https://github.com/yourusername/multi-step-form",
    image: "/projects/multi-step-form.png",
    category: "forms",
  },
];
