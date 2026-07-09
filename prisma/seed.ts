import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedProjects } from "./seed-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }

  const hashed = await bcrypt.hash(password, 12);
  const admin = await prisma.user.upsert({
    where: { email },
    // Re-seeding resets the admin password from .env (env is the source of truth).
    update: { role: "ADMIN", password: hashed },
    create: {
      firstName: "Guy",
      lastName: "Randalf",
      email,
      password: hashed,
      role: "ADMIN",
    },
  });
  console.log(`Seeded admin: ${admin.email} (${admin.role})`);

  // Remove projects that were renamed or dropped in the redesign.
  const staleSlugs = ["portfolio-rag-chat", "ai-agent-playground"];
  const removed = await prisma.project.deleteMany({
    where: { slug: { in: staleSlugs } },
  });
  if (removed.count) console.log(`Removed ${removed.count} stale project(s)`);

  for (const project of seedProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`Seeded ${seedProjects.length} projects`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
