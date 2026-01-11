import { Category } from '@prisma/client'
import { ProductWithIngredients } from './ProductWithIngredients'

export type CategoryWithProducts = Category & {
	products: ProductWithIngredients[]
}