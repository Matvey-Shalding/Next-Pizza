// lib/update-cart-total-amount.ts
import { getCartItemPrice } from '@/lib/get-cart-item-price';
import prisma from '@/lib/prisma';

export async function updateCartTotalAmount(cartId: number) {
	return prisma.$transaction(async tx => {
		const cart = await tx.cart.findFirst({
			where: { id: cartId },
			include: {
				items: {
					include: {
						productItem: { include: { product: true } },
						ingredients: true,
					},
				},
			},
		});

		if (!cart) {
			throw new Error('CART_NOT_FOUND');
		}

		const totalAmount = cart.items.reduce((acc, item) => acc + getCartItemPrice(item), 0);

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
}
