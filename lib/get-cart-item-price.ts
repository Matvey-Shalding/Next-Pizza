import { CartItemDTO } from '@/services/dto/cart.dto';

/**
 * Calculates the total price of a cart item.
 *
 * - Starts with the base product price (`item.productItem.price`).
 * - Adds the sum of all ingredient prices.
 * - Multiplies the result by the item quantity.
 *
 * This ensures that the final price reflects both the product base cost
 * and any additional ingredients, scaled by how many units are in the cart.
 *
 * @param item - The cart item data transfer object containing product, ingredients, and quantity.
 * @returns The total price of the cart item.
 *
 * @example
 * ```ts
 * const item: CartItemDTO = {
 *   id: 1,
 *   quantity: 2,
 *   productItem: { price: 10, size: 30, pizzaType: 1, product: { name: "Pizza", imageUrl: "/pizza.png" } },
 *   ingredients: [{ name: "Cheese", price: 2 }, { name: "Olives", price: 1 }]
 * };
 *
 * const price = getCartItemPrice(item);
 * // (10 + (2 + 1)) * 2 = 26
 * ```
 */
export const getCartItemPrice = (item: CartItemDTO) => {
  return (
    item.productItem.price +
    item.ingredients.reduce((acc, ing) => acc + ing.price, 0)
  ) * item.quantity;
};