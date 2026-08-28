// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// Prisma 7 requires every PrismaClient to be given a driver adapter
// explicitly — there's no longer an implicit default. @prisma/adapter-pg
// is used here (plain TCP via `pg`) rather than @prisma/adapter-neon,
// since this app runs as a long-lived Node process on a VPS via pm2, not
// on an edge/serverless runtime where raw TCP isn't available.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Next.js dev mode hot-reloads modules on every save. Without this guard,
// each reload would instantiate a new PrismaClient — and each one opens its
// own connection pool — quickly exhausting Postgres' connection limit.
// Caching the instance on `globalThis` in development sidesteps that.
// See: https://www.prisma.io/docs/guides/nextjs

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
