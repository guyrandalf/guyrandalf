export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demo: string;
  github?: string;
  image: string;
  category: "auth" | "payment" | "dashboard" | "chat" | "cms" | "search";
};
