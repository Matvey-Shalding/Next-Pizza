import { Category } from '@/prisma/generated/prisma'
import { ProductWithIngredients } from './ProductWithIngredients'

export type CategoryWithProducts = Category & {
	products: ProductWithIngredients[]
}