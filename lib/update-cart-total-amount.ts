import { getCartItemPrice } from '@/lib/get-cart-item-price';
import prisma from '@/lib/prisma';

/**
 * Updates the total amount of a cart in the database.
 *
 * - Fetches the cart by its ID, including all items, product details, and ingredients.
 * - Throws an error if the cart does not exist.
 * - Calculates the total amount by summing the price of each item using `getCartItemPrice`.
 * - Updates the cart record with the new `totalAmount`.
 * - Returns the updated cart with items ordered by creation date (descending).
 *
 * This function runs inside a Prisma transaction to ensure consistency
 * between reading the cart items and updating the total amount.
 *
 * @param cartId - The unique identifier of the cart to update.
 * @returns A promise resolving to the updated cart object, including items, product details, and ingredients.
 *
 * @throws Error - If the cart with the given ID is not found (`CART_NOT_FOUND`).
 *
 * @example
 * ```ts
 * const updatedCart = await updateCartTotalAmount(123);
 * console.log(updatedCart.totalAmount); // e.g. 45.99
 * console.log(updatedCart.items[0].productItem.product.name); // "Pepperoni Pizza"
 * ```
 */
export async function updateCartTotalAmount(cartId: number) {
  return prisma.$transaction(async tx => {
    const cart = await tx.cart.findFirst({
      where: { id: cartId },
      include: {
        items: {
          include: {
            productItem: { include: { product: true } },
            ingredients: true,
          },
        },
      },
    });

    if (!cart) {
      throw new Error('CART_NOT_FOUND');
    }

    const totalAmount = cart.items.reduce(
      (acc, item) => acc + getCartItemPrice(item),
      0
    );

    return tx.cart.update({
      where: { id: cart.id },
      data: { totalAmount },
      include: {
        items: {
          orderBy: { createdAt: 'desc' },
          include: {
            productItem: { include: { product: true } },
            ingredients: true,
          },
        },
      },
    });
  });
}