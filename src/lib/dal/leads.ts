import "server-only";
import type { LeadStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const leadsDal = {
  create(data: {
    leadName: string;
    service: string;
    location: string;
    partner?: string | null;
    discountCode?: string | null;
  }) {
    return prisma.lead.create({ data });
  },
  list() {
    return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  },
  updateStatus(id: string, status: LeadStatus) {
    return prisma.lead.update({ where: { id }, data: { status } });
  },
};
