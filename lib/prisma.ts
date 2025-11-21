// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a singleton PrismaClient with Accelerate
const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// Reuse the same instance in development
if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}

export default prisma;
