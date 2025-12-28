'use server'

import PayOrderTemplate from '@/components/shared/email-templates/pay-order'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/send-email'
import { OrderStatus } from '@/prisma/generated/prisma'
import { CheckoutFormSchemaType } from '@/schema/checkout-schema'
import { render } from '@react-email/components'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

export const createOrder = async (data: CheckoutFormSchemaType) => {
	console.log('Creating order...')

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

		const order = await prisma.order.create({
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


		let paymentUrl = ''


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

		const resend = new Resend(process.env.RESEND_API_KEY)

		const emailHtml = await render(
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: ''
			})
		)

		await sendEmail(data.email, 'Payment for the order', emailHtml)

		return paymentUrl
	} catch (e) {
		console.log('Error while creating order', e)
	}
}
