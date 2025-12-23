import { createIngredientsKey } from '@/lib/create-ingredients-key'
import { initCart } from '@/lib/init-cart'
import prisma from '@/lib/prisma'
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	// temporary the first user

	// TODO: fetch real token

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

// add cart item

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const cart = await initCart(token);

		const { ingredients, productItemId } = (await req.json()) as CreateCartItemValues;

		const ingredientsKey = createIngredientsKey(ingredients);

		// if such cart item already exists

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productItemId,
				ingredientsKey: ingredientsKey
			},
		});

		console.log(cartItem)


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
					ingredientsKey,
					ingredientsCount: ingredients?.length ?? 0,
				},
			});
		}

		const updatedCart = await updateCartTotalAmount(cart.id);

		const response = NextResponse.json(updatedCart);

		response.cookies.set('cartToken', token);

		return response;

	} catch (e) {
		console.error('[CART_POST] server error', e);
		return NextResponse.json({ message: 'Something went wrong'}, { status: 500 });
	}
}
