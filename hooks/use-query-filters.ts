import { PriceRange } from '@/@types'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { useDebounce } from 'react-use'

interface Props {
	sizes: Set<string>

	pizzaTypes: Set<string>

	selectedIngredients: Set<string>

	prices: PriceRange
}

export const useQueryIngredients = ({
	prices,
	pizzaTypes,
	sizes,
	selectedIngredients
}: Props) => {
	const router = useRouter()

	// This code fixes the bug when on mount query string is cleared

	const isMounted = React.useRef(false)

	useDebounce(
		() => {
			if (isMounted.current) {
				const filters = {
					pizzaTypes: Array.from(pizzaTypes),
					sizes: Array.from(sizes),
					priceFrom: prices.from,
					priceTo: prices.to,
					ingredients: Array.from(selectedIngredients)
				}

				const query = qs.stringify(filters, {
					arrayFormat: 'comma'
				})

				router.push(`?${query}`, {
					scroll: false
				})
			}

			isMounted.current = true
		},
		500,
		[selectedIngredients, sizes, pizzaTypes, prices]
	)
}
