import PayOrderTemplate from '@/components/shared/email-templates/pay-order'
import { render } from '@react-email/components'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
	const resend = new Resend(process.env.RESEND_API_KEY)

	try {
		const emailHtml = await render(
			PayOrderTemplate({
				orderId: 1,
				totalAmount: 100,
				paymentUrl: 'https://google.com'
			})
		)

		const { data } = await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'matvejsaldin8@gmail.com',
			subject: 'Hello world',
			html: emailHtml
		})

		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 }
		)
	}
}
