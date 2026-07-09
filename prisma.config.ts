import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env; `dotenv/config` populates process.env
// before Prisma resolves env() references below.

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "bun run prisma/seed.ts",
  },
  // Prisma 7: the CLI (migrate/studio) reads the connection URL from here,
  // not from the schema's datasource block. The runtime client uses the
  // @prisma/adapter-pg adapter (see src/lib/prisma.ts).
  datasource: {
    // CLI (migrate / studio) uses the DIRECT connection. The app runtime uses
    // DATABASE_URL (the pooled connection on serverless) via the pg adapter.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
