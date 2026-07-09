import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const mediaDal = {
  byProject(projectId: string) {
    return prisma.media.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
    });
  },
  create(data: Prisma.MediaCreateInput) {
    return prisma.media.create({ data });
  },
  remove(id: string) {
    return prisma.media.delete({ where: { id } });
  },
};
