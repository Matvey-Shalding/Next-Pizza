import {
  mapPizzaSize,
  mapPizzaType,
  PizzaSize,
  PizzaType
} from '@/constants/pizza'
import { CartItemWithIngredients } from '@/store/cart'

/**
 * Builds a human-readable description string for a pizza item.
 *
 * - Maps the numeric `PizzaSize` to a label (e.g., "Medium") and appends the size in centimeters.
 * - Maps the numeric `PizzaType` to a label (e.g., "Thin") and appends "dough".
 * - Converts all ingredient names to lowercase and joins them with commas.
 * - If ingredients are present, prefixes them with "+ " to indicate add-ons.
 *
 * @param type - The pizza type identifier (e.g., thin, traditional).
 * @param size - The pizza size identifier (e.g., 25, 30, 35 cm).
 * @param ingredients - The list of ingredient objects for the cart item.
 * @returns A formatted string describing the pizza size, type, and optional ingredients.
 *
 * @example
 * ```ts
 * const details = getItemDetails(1, 30, [
 *   { name: "Cheese", price: 2 },
 *   { name: "Olives", price: 1 }
 * ]);
 *
 * // " Medium 30 cm, thin dough + cheese, olives"
 * ```
 */
export const getItemDetails = (
  type: PizzaType,
  size: PizzaSize,
  ingredients: CartItemWithIngredients['ingredients']
): string => {
  const pizzaSize = mapPizzaSize[size] + ' ' + size + ' cm'
  const pizzaType = mapPizzaType[type].toLowerCase() + ' dough'
  const pizzaIngredients = ingredients
    .map(ing => ing.name.toLowerCase())
    .join(', ')
  return ` ${pizzaSize}, ${pizzaType} ${
    pizzaIngredients ? '+ ' + pizzaIngredients : ''
  }`
}