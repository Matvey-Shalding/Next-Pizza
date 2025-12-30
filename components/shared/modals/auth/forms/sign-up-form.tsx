import { createUser } from '@/app/actions'
import { Title } from '@/components/shared'
import { FormInput } from '@/components/shared/form'
import { Button } from '@/components/ui'
import { signUpSchema, SignUpSchemaType } from '@/schema/sign-up-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	onClose?: VoidFunction
}

export const SignUpForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: SignUpSchemaType) => {
		try {
			await createUser(data)

			toast.success('You have successfully signed up', {
				icon: '✅'
			})

			onClose?.()
		} catch (error) {
			console.error('Error [LOGIN]', error)
			toast.error('Failed to sign up', {
				icon: '❌'
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title
							text="Sign in to your account"
							size="md"
							className="font-bold"
						/>
						<p className="text-gray-400">Create an account</p>
					</div>
					<img
						src="/assets/images/phone-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>
				<FormInput
					name="fullName"
					label="Full name"
					required
				/>
				<FormInput
					name="email"
					label="E-Mail"
					required
				/>
				<FormInput
					name="password"
					label="Password"
					type="password"
					required
				/>
				<FormInput
					name="confirmPassword"
					label="Confirm password"
					required
				/>
				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Sign up
				</Button>
			</form>
		</FormProvider>
	)
}
