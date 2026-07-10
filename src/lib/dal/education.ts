import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const educationDal = {
  list() {
    return prisma.education.findMany({
      orderBy: [{ order: "asc" }, { startYear: "desc" }],
    });
  },
  byId(id: string) {
    return prisma.education.findUnique({ where: { id } });
  },
  create(data: Prisma.EducationCreateInput) {
    return prisma.education.create({ data });
  },
  update(id: string, data: Prisma.EducationUpdateInput) {
    return prisma.education.update({ where: { id }, data });
  },
  remove(id: string) {
    return prisma.education.delete({ where: { id } });
  },
};
