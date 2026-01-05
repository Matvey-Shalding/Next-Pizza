/**
 * Generates a normalized, unique key string from an array of ingredient IDs.
 *
 * - Removes duplicates using a `Set`.
 * - Filters out non-integers and non-positive values.
 * - Sorts the remaining IDs in ascending order.
 * - Joins them into a comma-separated string.
 *
 * This key can be used as a unique identifier in the database
 * to represent a specific combination of ingredients.
 *
 * @param ids - An array of ingredient IDs (numbers). If `undefined`, returns an empty string.
 * @returns A comma-separated string of sorted, unique, valid ingredient IDs.
 *
 * @example
 * ```ts
 * createIngredientsKey([3, 1, 2, 2, -5, 1])
 * // returns "1,2,3"
 *
 * createIngredientsKey(undefined)
 * // returns ""
 * ```
 */
export function createIngredientsKey(ids: number[] | undefined): string {
  if (!ids) return '';

  return Array.from(
    new Set(
      ids
        .map(Number)
        .filter(id => Number.isInteger(id) && id > 0)
    )
  )
    .sort((a, b) => a - b)
    .join(',');
}