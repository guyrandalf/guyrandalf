import "server-only";
import { prisma } from "@/lib/prisma";

export const sessionsDal = {
  create(data: {
    userId: string;
    jti: string;
    hashedToken: string;
    expiresAt: Date;
    userAgent?: string | null;
    ip?: string | null;
  }) {
    return prisma.session.create({ data });
  },
  findByJti(jti: string) {
    return prisma.session.findUnique({ where: { jti } });
  },
  revokeByJti(jti: string) {
    return prisma.session.updateMany({
      where: { jti, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },
  revokeAllForUser(userId: string) {
    return prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },
};
