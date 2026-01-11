'use client'

import { createOrder } from '@/app/actions'
import { Container, Title } from '@/components/shared'
import {
	AdditionalInformation,
	Cart,
	CheckoutEmpty,
	CheckoutSidebar,
	PersonalInfo
} from '@/components/shared/checkout'
import { useCart } from '@/hooks'
import {
	checkoutFormSchema,
	CheckoutFormSchemaType
} from '@/schema/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function Checkout() {
	const methods = useForm<CheckoutFormSchemaType>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: { address: '' }
	})

	const [submitting, setSubmitting] = useState(false)
	const [wasLoaded, setWasLoaded] = useState(false)

	const router = useRouter()
	const { items, onClickCountButton, removeCartItem, totalAmount, loading } =
		useCart()

	// mark as loaded once the first fetch finishes
	useEffect(() => {
		if (!loading && !wasLoaded) {
			setWasLoaded(true)
		}
	}, [loading, wasLoaded])

	const onSubmit = methods.handleSubmit(async data => {
		try {
			setSubmitting(true)
			await createOrder(data)
			router.push('/?paid=success')
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setSubmitting(false)
		}
	})

	// Empty cart UI
	if (items.length === 0 && wasLoaded) {
		return <CheckoutEmpty />
	}

	return (
		<FormProvider {...methods}>
			<Container className="tablet:pt-10 phone:pt-8 small-phone:pt-6 flex flex-col gap-y-12 small-laptop:pb-20 tablet:pb-16 phone:pb-12 small-phone:pb-9 max-tablet:px-0!">
				<Title
					text="Checkout"
					size="lg"
					className="font-bold tablet:text-[32px] max-tablet:px-6 phone:text-[28px] small-phone:text-[24px] laptop:text-[36px]"
				/>
				<form
					onSubmit={onSubmit}
					className="laptop:grid laptop:grid-cols-[1.67fr_1fr] flex flex-col phone:gap-8 small-phone:gap-6 tablet:gap-11"
				>
					<div className="flex flex-col phone:gap-y-8 small-phone:gap-y-6 tablet:gap-y-11">
						<Cart
							loading={!wasLoaded && loading}
							items={items}
							onClickCountButton={onClickCountButton}
							removeCartItem={removeCartItem}
							totalAmount={totalAmount}
						/>
						<PersonalInfo />
						<AdditionalInformation />
					</div>
					<CheckoutSidebar
						loading={loading || methods.formState.isSubmitting || submitting}
						totalAmount={totalAmount}
					/>
				</form>
			</Container>
		</FormProvider>
	)
}
