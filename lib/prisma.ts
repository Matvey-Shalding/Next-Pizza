import { PrismaClient } from '@/prisma/generated/prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
}

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global;

const prismaClient = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismaClient;
export default prismaClient