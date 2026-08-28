// prisma.config.ts
// PUBLIC REPO NOTE: this file only reads from process.env — it never
// contains a real connection string. The value comes from `.env`, which is
// gitignored and must never be committed.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
