import "server-only";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";

export const usersDal = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
  create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: Role;
  }) {
    return prisma.user.create({ data });
  },
};
