import z from 'zod'
import { logInSchema } from './log-in-schema'

export const profileSchema = logInSchema
	.extend({
		fullName: z
			.string()
			.min(2, { message: 'Full name must be at least 2 characters' }),
		confirmPassword: z
			.string()
			.optional(),
		password: z
			.string()
			.optional()
	})
	// Check if the password isn't empty, it must be at least 6 chars
	.refine(
		data => {
			if (data.password && data.password.length < 6) {
				return false
			}

			return true
		},
		{
			message: 'Password must be at least 6 characters',
			path: ['password']
		}
	)
	// Check if the confirm password isn't empty, it must be at least 6 chars
	.refine(
		data => {
			if (data.confirmPassword && data.confirmPassword.length < 6) {
				return false
			}
			return true
		},
		{
			message: 'Confirm password must be at least 6 characters',
			path: ['confirmPassword']
		}
	)
	// Check if non-empty password fields match
	.refine(
		data => {
			if (!data.password && !data.confirmPassword) {
				return true
			}

			if (data.password?.length! >= 6 && data.confirmPassword?.length! >= 6) {
				return data.password === data.confirmPassword
			}
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword']
		}
	)

export type ProfileSchemaType = z.infer<typeof profileSchema>
