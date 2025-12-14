import { Cart, CartItem, Ingredient, Product, ProductItem } from '@/prisma/generated/prisma';

// Modified types to match with what cart route returns

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  },
  ingredients: Ingredient[]
}

export interface CartDTO extends Cart {
  items: CartItemDTO[]
}