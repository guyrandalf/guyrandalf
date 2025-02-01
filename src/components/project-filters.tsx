"use client";

import {
  Lock,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const filterCategories = [
  { id: "all", label: "All Projects", icon: null },
  { id: "auth", label: "Authentication", icon: Lock },
  { id: "payment", label: "Payments", icon: CreditCard },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Real-time Chat", icon: MessageSquare },
  { id: "cms", label: "CMS", icon: FileText },
  { id: "search", label: "Search", icon: Search },
] as const;

type FilterProps = {
  activeCategory: string;
  onFilterChange: (category: string) => void;
};

export default function ProjectFilters({
  activeCategory,
  onFilterChange,
}: FilterProps) {
  const getProjectCount = (category: string) => {
    if (category === "all") return projects.length;
    return projects.filter((project) => project.category === category).length;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-wrap gap-2"
    >
      {filterCategories.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeCategory === id ? "default" : "outline"}
          onClick={() => onFilterChange(id)}
          className="group flex items-center gap-2"
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{label}</span>
          <Badge
            variant="secondary"
            className="ml-2 transition-colors group-hover:bg-background"
          >
            {getProjectCount(id)}
          </Badge>
        </Button>
      ))}
    </motion.div>
  );
}
