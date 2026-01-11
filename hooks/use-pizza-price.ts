import { PizzaSize, PizzaType } from '@/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'
import { useMemo } from 'react'

export const usePizzaPrice = (
	items: ProductItem[],
	size: PizzaSize,
	type: PizzaType,
	ingredients: Ingredient[],
	selectedIngredientIds: Set<number>
) => {
	return useMemo(() => {
		const basePrice =
			items.find(item => item.size === size && item.pizzaType === type)
				?.price || 0

		const toppingsPrice = ingredients
			.filter(ing => selectedIngredientIds.has(ing.id))
			.reduce((sum, ing) => sum + ing.price, 0)

		return Number(basePrice) + toppingsPrice
	}, [items, size, type, ingredients, selectedIngredientIds])
}
