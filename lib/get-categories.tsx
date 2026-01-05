import { CategoryWithProducts } from '@/@types/CategoryWithProducts'
import prisma from './prisma'

/**
 * Search parameters for filtering categories and products.
 *
 * All fields are optional and passed as comma-separated strings
 * or numeric ranges.
 */
export interface SearchParams {
  /** Comma-separated list of pizza sizes (e.g. "25,30,35") */
  sizes?: string
  /** Comma-separated list of pizza types (e.g. "1,2") */
  pizzaTypes?: string
  /** Comma-separated list of ingredient IDs (e.g. "3,5,7") */
  ingredients?: string
  /** Minimum price filter (stringified number) */
  priceFrom?: string
  /** Maximum price filter (stringified number) */
  priceTo?: string
}

/** Default minimum price used when no filter is provided */
const DEFAULT_MIN_PRICE = 0
/** Default maximum price used when no filter is provided */
const DEFAULT_MAX_PRICE = 1000

/**
 * Retrieves categories with their products from the database,
 * applying optional filters for size, pizza type, ingredients, and price range.
 *
 * - Parses and sanitizes query parameters into numeric arrays.
 * - Applies ingredient filters at the product level.
 * - Applies size, type, and price filters at the product item level.
 * - Includes product ingredients and items in the result.
 * - Orders product items by ascending price.
 *
 * @param params - The search parameters containing optional filters.
 * @returns A promise resolving to an array of categories with filtered products.
 *
 * @example
 * ```ts
 * const categories = await getCategories({
 *   sizes: "25,30",
 *   pizzaTypes: "1",
 *   ingredients: "3,5",
 *   priceFrom: "10",
 *   priceTo: "50"
 * });
 *
 * console.log(categories[0].products[0].items);
 * // => filtered product items within the given constraints
 * ```
 */
export const getCategories = async (
  params: SearchParams
): Promise<CategoryWithProducts[]> => {
  // Parse & sanitize size filter
  const mappedSizes = params.sizes
    ? params.sizes.split(',').map(Number).filter(n => !isNaN(n))
    : []

  // Parse & sanitize pizzaType filter
  const mappedPizzaTypes = params.pizzaTypes
    ? params.pizzaTypes.split(',').map(Number).filter(n => !isNaN(n))
    : []

  // Parse & sanitize ingredients filter
  const mappedIngredients = params.ingredients
    ? params.ingredients.split(',').map(Number).filter(n => !isNaN(n))
    : []

  // Parse price (safe)
  const minPrice =
    params.priceFrom && !isNaN(Number(params.priceFrom))
      ? Number(params.priceFrom)
      : DEFAULT_MIN_PRICE
  const maxPrice =
    params.priceTo && !isNaN(Number(params.priceTo))
      ? Number(params.priceTo)
      : DEFAULT_MAX_PRICE

  return await prisma.category.findMany({
    include: {
      products: {
        where: {
          // Ingredient filter (on product level)
          ...(mappedIngredients.length > 0 && {
            ingredients: {
              some: {
                id: {
                  in: mappedIngredients,
                },
              },
            },
          }),
          // Item-based filters (on product relation)
          items: {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
              ...(mappedSizes.length > 0 && { size: { in: mappedSizes } }),
              ...(mappedPizzaTypes.length > 0 && {
                pizzaType: { in: mappedPizzaTypes },
              }),
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
              ...(mappedSizes.length > 0 && { size: { in: mappedSizes } }),
              ...(mappedPizzaTypes.length > 0 && {
                pizzaType: { in: mappedPizzaTypes },
              }),
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  })
}