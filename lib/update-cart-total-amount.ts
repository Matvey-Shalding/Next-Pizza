import { getCartItemPrice } from './get-cart-item-price';
import prisma from './prisma';

export const updateCartTotalAmount = async (token: string) => {
	const cart = await prisma.cart.findFirst({
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

	console.log(cart);

	if (!cart) {
		return;
	}

	const totalAmount = cart.items.reduce((acc, item) => acc + getCartItemPrice(item), 0);

	return await prisma.cart.update({
		where: {
			id: cart.id,
		},
		data: {
			totalAmount,
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
};
