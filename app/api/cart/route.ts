import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// const token = req.cookies.get('cartToken')?.value;

	// temporary the first user

	const token = '123';

	if (!token) {
		return NextResponse.json({
			totalAmount: 0,
			items: [],
		});
	}

	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
  });
  
  return NextResponse.json(userCart);
}
