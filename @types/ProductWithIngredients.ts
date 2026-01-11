import { Ingredient, Product, ProductItem } from '@prisma/client'

export type ProductWithIngredients = Product & {
	items: ProductItem[]
	ingredients: Ingredient[]
}
