import { CartDTO } from '@/services/dto/cart.dto';
import { CartItemWithIngredients } from '@/store/cart';
import { getCartItemPrice } from './get-cart-item-price';

interface ReturnProps {
  items: CartItemWithIngredients[];
  totalAmount: number;
}

/**
 * Transforms a raw `CartDTO` object from the API into a normalized cart state
 * suitable for use in the application store.
 *
 * - Maps each raw cart item into a `CartItemWithIngredients` structure.
 * - Calculates the item price using `getCartItemPrice`.
 * - Extracts product details (name, image, size, type).
 * - Normalizes ingredient list into `{ name, price }` objects.
 * - Returns the cart items along with the total cart amount.
 *
 * @param cart - The raw cart data transfer object returned by the API.
 * @returns An object containing:
 * - `items`: A list of normalized cart items with ingredients and metadata.
 * - `totalAmount`: The total monetary value of the cart.
 *
 * @example
 * ```ts
 * const cartDto: CartDTO = await Api.cart.getCart();
 * const cartDetails = getCartDetails(cartDto);
 * console.log(cartDetails.totalAmount); // e.g. 42.50
 * console.log(cartDetails.items[0].name); // "Pepperoni Pizza"
 * ```
 */
export const getCartDetails = (cart: CartDTO): ReturnProps => {
  const items: CartItemWithIngredients[] = cart.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: getCartItemPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map(ing => ({ name: ing.name, price: ing.price })),
  }));

  return {
    items,
    totalAmount: cart.totalAmount,
  };
};