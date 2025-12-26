'use client'

import { createOrder } from '@/app/actions'
import { Container, Title } from '@/components/shared'
import {
	AdditionalInformation,
	Cart,
	CheckoutSidebar,
	PersonalInfo
} from '@/components/shared/checkout'
import { useCart } from '@/hooks'
import {
	checkoutFormSchema,
	CheckoutFormSchemaType
} from '@/schema/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

//TODO: Add loading state, react Imask

export default function Checkout() {
	const methods = useForm<CheckoutFormSchemaType>({
		resolver: zodResolver(checkoutFormSchema)
	})

	const [submitting, setSubmitting] = useState(false)

	const onSubmit = methods.handleSubmit(async data => {
		try {
			setSubmitting(true)
			const url = await createOrder(data)
			toast.success('Order created successfully')
			if (url) {
				location.href = url
			}
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setSubmitting(false)
		}
	})

	const { items, onClickCountButton, removeCartItem, totalAmount, loading } =
		useCart()

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
							loading={loading}
							items={items}
							onClickCountButton={onClickCountButton}
							removeCartItem={removeCartItem}
							totalAmount={totalAmount}
						/>
						<PersonalInfo />
						<AdditionalInformation />
					</div>
					<CheckoutSidebar
						loading={loading || submitting}
						totalAmount={totalAmount}
					/>
				</form>
			</Container>
		</FormProvider>
	)
}
