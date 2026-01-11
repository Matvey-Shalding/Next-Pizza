'use client'

import { updateProfile } from '@/app/actions'
import { cn } from '@/lib/utils'
import { User } from '@/prisma/generated/prisma'
import { profileSchema, ProfileSchemaType } from '@/schema/profile-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../ui'
import { Container } from './container'
import { FormInput } from './form'
import { Title } from './title'
interface Props {
	className?: string
	user: User
}
export const ProfileForm: React.FC<Props> = ({ className, user }) => {
	const router = useRouter()

	const methods = useForm<ProfileSchemaType>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			fullName: user.fullName,
			email: user.email
		}
	})

	const onSubmit = async (data: ProfileSchemaType) => {
		try {
			await updateProfile(data)
			router.push('/?updateProfile=success')
		} catch (error: any) {
			toast.error(error.message)
			methods.reset({
				fullName: user.fullName,
				email: user.email,
				password: '',
				confirmPassword: ''
			})
		}
	}

	const onSignOut = async () => {
		await signOut({ callbackUrl: '/?signOut=success' })
	}

	return (
		<FormProvider {...methods}>
			<Container className={cn(className, 'my-10')}>
				<div className="flex flex-col gap-y-5">
					<Title
						text="Personal information"
						size="lg"
						className="font-bold small-laptop:text-[32px]! tablet:text-[28px]! phone:text-[24px]! small-phone:text-[22px]!"
					/>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="flex max-w-150 justify-center flex-col gap-y-2"
					>
						<FormInput
							label="Full name"
							name="fullName"
						/>
						<FormInput
							label="Email"
							name="email"
						/>
						<FormInput
							type="password"
							label="Password"
							name="password"
						/>
						<FormInput
							type="password"
							label="Confirm password"
							name="confirmPassword"
						/>
						<div className="flex items-center gap-x-4">
							<Button
								loading={methods.formState.isSubmitting}
								type="submit"
								className="w-full min-h-11"
							>
								Update
							</Button>
							<Button
								type="button"
								loading={methods.formState.isSubmitting}
								className="w-full min-h-11"
								onClick={() => onSignOut()}
								variant="outline"
							>
								Sign out
							</Button>
						</div>
					</form>
				</div>
			</Container>
		</FormProvider>
	)
}
