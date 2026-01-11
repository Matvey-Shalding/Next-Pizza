'use server'


import { PayOrderTemplate } from '@/components/shared'
import { getUserSession } from '@/lib/get-user-session'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/send-email'
import { CheckoutFormSchemaType } from '@/schema/checkout-schema'
import { ProfileSchemaType } from '@/schema/profile-schema'
import { SignUpSchemaType } from '@/schema/sign-up-schema'
import { OrderStatus } from '@prisma/client'
import { render } from '@react-email/components'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

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
	} catch (e) {}
}

export const updateProfile = async (data: ProfileSchemaType) => {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			console.error('[PROFILE_UPDATE_ERROR] User not found in getServerSession')
			throw new Error('Something went wrong...')
		}

		const user = await prisma.user.findUnique({
			where: {
				id: +currentUser.user.id
			}
		})

		if (!user) {
			console.error(
				'[PROFILE_UPDATE_ERROR] User with such id was not found in db'
			)
			throw new Error('Something went wrong...')
		}

		// Check is this email is unique

		const findUser = await prisma.user.findUnique({
			where: {
				email: data.email
			}
		})

		if (findUser && findUser.id !== user.id) {
			console.error(
				'[PROFILE_UPDATE_ERROR] User with such email already exists'
			)
			throw new Error('User with such email already exists')
		}

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				fullName: data.fullName,
				email: data.email,
				password: data.password ? hashSync(data.password, 10) : user.password
			}
		})
	} catch (error) {
		// Error for client
		throw error
	}
}

export const createUser = async (form: SignUpSchemaType) => {
	try {
		const findUser = await prisma.user.findUnique({
			where: {
				email: form.email
			}
		})

		if (findUser) {
			throw new Error('User already exists')
		}

		await prisma.user.create({
			data: {
				fullName: form.fullName,
				email: form.email,
				password: hashSync(form.password, 10)
			}
		})
	} catch (error) {
		throw error
	}
}
