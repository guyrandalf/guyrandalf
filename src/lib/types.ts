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
  | "multi-step-form"
  | "todo-crud"
  | "real-time-chat"
  | "file-upload"
  | "user-dashboard"
  | "admin-dashboard"
  | "e-commerce"
  | "blog"
  | "api-crud"
  | "notifications"
  | "social-media"
  | "maps"
  | "charts"
  | "fullstack"
  | "ecommerce-cart"
  | "referrals"

export interface Project {
  id: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  category: ProjectCategory;
}

export type ReferralResponse = {
  id: string;
  leadName: string;
  partner: string | null;
  status: "Referred" | "Pending";
  discountCode?: string;
  productName?: string;
};