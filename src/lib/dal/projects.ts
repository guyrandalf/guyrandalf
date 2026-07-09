import "server-only";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const withMedia = {
  media: { orderBy: { order: "asc" as const } },
} satisfies Prisma.ProjectInclude;

export type ProjectWithMedia = Prisma.ProjectGetPayload<{
  include: typeof withMedia;
}>;

export const projectsDal = {
  listPublished() {
    return prisma.project.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: withMedia,
    });
  },
  listFeatured() {
    return prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
      include: withMedia,
    });
  },
  listAll() {
    return prisma.project.findMany({
      orderBy: { order: "asc" },
      include: withMedia,
    });
  },
  bySlug(slug: string) {
    return prisma.project.findUnique({ where: { slug }, include: withMedia });
  },
  byId(id: string) {
    return prisma.project.findUnique({ where: { id }, include: withMedia });
  },
  create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data });
  },
  update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({ where: { id }, data });
  },
  remove(id: string) {
    return prisma.project.delete({ where: { id } });
  },
};
