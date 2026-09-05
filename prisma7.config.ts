import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // للـ migrations لازم اتصال مباشر (بورت 5432)، مش رابط الـ pgbouncer pooler
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});