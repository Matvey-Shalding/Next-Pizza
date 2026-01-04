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
			<Container className="pt-10 flex flex-col gap-y-12 pb-20">
				<Title
					text="Checkout"
					size="lg"
					className="font-bold text-[36px]"
				/>
				<form
					onSubmit={onSubmit}
					className="grid grid-cols-[1.67fr_1fr] gap-11"
				>
					<div className="flex flex-col gap-y-11">
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
