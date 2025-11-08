// global prisma client
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
const globalForPrisma = global as unknown as { prisma: PrismaClient };

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

export default globalForPrisma.prisma;