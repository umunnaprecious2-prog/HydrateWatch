import { PrismaClient } from "@prisma/client";

// Ensure a single global instance of PrismaClient in development to prevent hot-reloading issues
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
