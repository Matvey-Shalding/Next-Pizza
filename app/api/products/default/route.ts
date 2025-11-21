import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const products = await prisma.product.findMany({
		take: 5,
	});

	return NextResponse.json(products);
}
