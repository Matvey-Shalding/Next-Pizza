import z from 'zod'
import { logInSchema } from './log-in-schema'

export const signUpSchema = logInSchema
	.extend({
		fullName: z
			.string()
			.min(2, { message: 'Full name must be at least 2 characters' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' })
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	})

export type SignUpSchemaType = z.infer<typeof signUpSchema>