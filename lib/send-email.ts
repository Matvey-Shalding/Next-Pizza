import { Resend } from 'resend'

export const sendEmail = async (
	to: string,
	subject: string,
	template: string
) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

	const { data, error } = await resend.emails.send({
		from: 'next-pizza@resend.dev',
		to,
		subject,
		html: template
	})

	if (error) {
		throw error
	}

	return data
}
