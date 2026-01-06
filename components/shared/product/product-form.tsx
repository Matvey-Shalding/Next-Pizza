'use client'

import { ProductWithIngredients } from '@/@types'
import { ProductFormContext } from '@/context/ProductForm'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm, ChooseProductForm } from '..'
interface Props {
	className?: string
	product: ProductWithIngredients
	inline?: boolean
}
export const ProductForm: React.FC<Props> = ({
	className,
	product,
	inline
}) => {
	const { addCartItem, loading } = useCartStore()

	const isPizza = useMemo(() => {
		return Boolean(product.items[0].pizzaType)
	}, [])

	const router = useRouter()

	const onSubmit = async (productId?: number, ingredients?: number[]) => {
		try {
			await addCartItem({
				productItemId: productId ?? product.items[0].id,
				ingredients: ingredients
			})

			toast.success(`${product.name} added to cart`)

			router.back()
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	if (isPizza) {
		return (
			<ProductFormContext value={!!inline}>
				<ChoosePizzaForm
					loading={loading}
					onSubmit={onSubmit}
					name={product.name}
					imageUrl={product.imageUrl}
					items={product.items}
					ingredients={product.ingredients}
				/>
			</ProductFormContext>
		)
	} else {
		return (
			<ProductFormContext value={!!inline}>
				<ChooseProductForm
					loading={loading}
					onSubmit={onSubmit}
					items={product.items}
					name={product.name}
					imageUrl={product.imageUrl}
				/>
			</ProductFormContext>
		)
	}
}
