export type ProjectCategory =
  | "auth"
  | "referrals"
  | "search"
  | "ui"
  | "fullstack"
  | "chat"

export interface Project {
  id: number;
  title: string;
  slug: string;
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