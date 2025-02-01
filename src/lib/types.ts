export type ProjectCategory =
  | "auth"
  | "forms"
  | "ui"
  | "animations"
  | "api-integration"
  | "dashboard"
  | "navigation"
  | "input-validation"
  | "toast-notifications"
  | "modal-component"
  | "pagination-ui"
  | "table-component"
  | "dashboard-cards"
  | "filter-search"
  | "sidebar-navigation"
  | "multi-step-form";

export interface Project {
  id: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  category: ProjectCategory;
}
