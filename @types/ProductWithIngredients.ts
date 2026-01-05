import { Ingredient, Product, ProductItem } from '@/prisma/generated/prisma'

export type ProductWithIngredients = Product & {
  items: ProductItem[],
  ingredients: Ingredient[]
}
