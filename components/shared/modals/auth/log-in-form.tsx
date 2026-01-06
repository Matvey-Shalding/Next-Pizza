import { Title } from '@/components/shared'
import { FormInput } from '@/components/shared/form'
import { Button } from '@/components/ui'
import { logInSchema, LogInSchemaType } from '@/schema/log-in-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
	onClose: VoidFunction
}

export const LogInForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<LogInSchemaType>({
		resolver: zodResolver(logInSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: LogInSchemaType) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false
			})

			console.log(resp)

			if (!resp?.ok) {
				throw new Error()
			}

			toast.success('You have successfully signed in', {
				icon: '✅'
			})

			onClose?.()
		} catch (error) {
			console.error('Error [LOGIN]', error)
			toast.error('Failed to sign in', {
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
						<p className="text-gray-400">
							Enter your email to sign in to your account
						</p>
					</div>
					<img
						src="/assets/images/phone-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>

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

				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Sign in
				</Button>
			</form>
		</FormProvider>
	)
}
