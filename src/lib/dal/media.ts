import "server-only";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

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
