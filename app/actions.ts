'use server'

import prisma from '@/lib/prisma'
import { OrderStatus } from '@/prisma/generated/prisma'
import { CheckoutFormSchemaType } from '@/schema/checkout-schema'
import { cookies } from 'next/headers'

export const createOrder = async (data: CheckoutFormSchemaType) => {
	try {
		const cookie = await cookies()

		const cartToken = cookie.get('cartToken')?.value

		if (!cartToken) {
			throw new Error('Cart token not found')
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true
							}
						}
					}
				}
			},
			where: {
				token: cartToken
			}
		})

		if (!userCart) {
			throw new Error('Cart not found')
		}

		// Create order

		await prisma.order.create({
			data: {
				userId: userCart.userId || undefined,
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: userCart.items
			}
		})

		// Clear the cart

		await prisma.cart.update({
			where: {
				id: userCart?.id
			},
			data: {
				totalAmount: 0
			}
		})

		// Delete all related items

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart?.id
			}
		})

		//TODO: send payment url

		// const url = 'https://github.com/vitalybaev/react-dadata'

		return ''
	} catch (e) {
		console.log('Error while creating order', e)
	}
}
