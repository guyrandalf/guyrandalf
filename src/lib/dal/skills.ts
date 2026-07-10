import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const skillsDal = {
  list() {
    return prisma.skill.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
  },
  create(data: Prisma.SkillCreateInput) {
    return prisma.skill.create({ data });
  },
  remove(id: string) {
    return prisma.skill.delete({ where: { id } });
  },
};
