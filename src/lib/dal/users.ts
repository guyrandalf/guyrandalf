import "server-only";
import type { Role } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

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
  updatePassword(id: string, password: string) {
    return prisma.user.update({ where: { id }, data: { password } });
  },
};
