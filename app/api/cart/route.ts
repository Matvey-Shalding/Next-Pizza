import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { initCart } from '@/lib/init-cart';
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount';
import { CreateCartItemValues } from '@/services/dto/cart.dto';

export async function GET(req: NextRequest) {
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

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const cart = await initCart(token);

		const { ingredients, productItemId } = (await req.json()) as CreateCartItemValues;

		// if such cart item already exists

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productItemId,
				ingredients: {
					every: {
						id: {
							in: ingredients,
						},
					},
				},
			},
		});

		console.log(cartItem);

		//update quantity

		if (cartItem) {
			await prisma.cartItem.update({
				where: {
					id: cartItem.id,
				},
				data: {
					quantity: cartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					quantity: 1,
					cartId: cart.id,
					productItemId,
					ingredients: {
						connect: ingredients?.map(id => ({ id })),
					},
				},
			});
		}

		const updatedCart = await updateCartTotalAmount(cart.id);

		const response = NextResponse.json(updatedCart);

		response.cookies.set('cartToken', token);

		return response;
	} catch (e) {
		console.error('[CART_POST] server error', e);
		return NextResponse.json({ message: 'Something went wrong' + e }, { status: 500 });
	}
}
