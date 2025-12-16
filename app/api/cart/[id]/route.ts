import { getCartItemPrice } from '@/lib/get-cart-item-price';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params;
		const idNum = Number(id);
		const { quantity } = (await req.json()) as { quantity: number };
		const token = '123';

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });
		}

		const result = await prisma.$transaction(async tx => {
			// 1. Verify item exists
			const cartItem = await tx.cartItem.findFirst({
				where: { id: idNum },
				include: { cart: true },
			});

			if (!cartItem) {
				throw new Error('CART_ITEM_NOT_FOUND');
			}

			// 2. Update quantity
			await tx.cartItem.update({
				where: { id: idNum },
				data: { quantity },
			});

			// 3. Recalculate total — guaranteed to see the updated item
			const cart = await tx.cart.findFirst({
				where: { id: cartItem.cartId },
				include: {
					items: {
						include: {
							productItem: { include: { product: true } },
							ingredients: true,
						},
					},
				},
			});

			if (!cart) throw new Error('CART_NOT_FOUND');

			const totalAmount = cart.items.reduce((acc:any, item:any) => acc + getCartItemPrice(item), 0);

			// 4. Update total
			return tx.cart.update({
				where: { id: cart.id },
				data: { totalAmount },
				include: {
					items: {
						orderBy: { createdAt: 'desc' },
						include: {
							productItem: { include: { product: true } },
							ingredients: true,
						},
					},
				},
			});
		});

		return NextResponse.json(result);
	} catch (error: any) {
		if (error.message === 'CART_ITEM_NOT_FOUND') {
			return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
		}
		if (error.message === 'CART_NOT_FOUND') {
			return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
		}

		console.error('[CART_PATCH] server error', error);
		return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
	}
}
