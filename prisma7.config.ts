import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js uses .env.local; Prisma CLI does not load it automatically in v7.
loadEnv({ path: ".env.local" });
loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    // للـ migrations لازم اتصال مباشر (بورت 5432)، مش رابط الـ pgbouncer pooler
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
