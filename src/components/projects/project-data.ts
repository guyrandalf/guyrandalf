import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "auth-demo",
    title: "Authentication System",
    description:
      "Complete authentication system with JWT, OAuth, and role-based access.",
    tags: ["Next.js", "Auth.js", "JWT", "OAuth"],
    demo: "/projects/auth",
    github: "https://github.com/yourusername/auth-demo",
    image: "/projects/auth.png",
    category: "auth",
  },
  {
    id: "payment-integration",
    title: "Payment System",
    description:
      "Stripe integration with custom checkout and subscription management.",
    tags: ["Stripe", "Next.js", "TypeScript"],
    demo: "/projects/payment",
    github: "https://github.com/yourusername/payment-demo",
    image: "/projects/payment.png",
    category: "payment",
  },
  // Add more projects...
];
