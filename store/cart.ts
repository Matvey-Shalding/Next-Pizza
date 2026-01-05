import { getCartDetails } from '@/lib/get-cart-details'
import { Api } from '@/services/api-client'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { create } from 'zustand'

/**
 * Represents a single cart item with optional pizza configuration and ingredients.
 */
export interface CartItemWithIngredients {
  /** Unique identifier of the cart item */
  id: number
  /** Quantity of the item in the cart */
  quantity: number
  /** Display name of the product */
  name: string
  /** URL of the product image */
  imageUrl: string
  /** Base price of the product */
  price: number
  /** Optional pizza size identifier */
  pizzaSize?: number | null
  /** Optional pizza type identifier */
  pizzaType?: number | null
  /** List of selected ingredients with their individual prices */
  ingredients: Array<{ name: string; price: number }>
  /** Flag to temporarily disable the item during async updates */
  disabled?: boolean
}

/**
 * Zustand store state and actions for managing the shopping cart.
 */
export interface CartState {
  /** Indicates whether cart operations are loading */
  loading: boolean
  /** Indicates whether the last operation resulted in an error */
  error: boolean
  /** Total amount of the cart (calculated from items) */
  totalAmount: number
  /** List of items currently in the cart */
  items: CartItemWithIngredients[]

  /**
   * Fetches all cart items from the API and updates the store.
   * Sets `loading` to true while fetching and handles errors gracefully.
   */
  fetchCartItems: () => Promise<void>

  /**
   * Updates the quantity of a specific cart item.
   * Temporarily disables the item while the request is in progress.
   *
   * @param id - The unique identifier of the cart item
   * @param quantity - The new quantity to set
   */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>

  /**
   * Adds a new item to the cart.
   *
   * @param values - The payload containing product and configuration details
   */
  addCartItem: (values: CreateCartItemValues) => Promise<void>

  /**
   * Removes an item from the cart.
   * Temporarily disables the item while the request is in progress.
   *
   * @param id - The unique identifier of the cart item
   */
  removeCartItem: (id: number) => Promise<void>
}

/**
 * Zustand store hook for accessing and manipulating the shopping cart state.
 *
 * Provides actions for fetching, updating, adding, and removing cart items.
 * Automatically manages loading and error states.
 */
export const useCartStore = create<CartState>(set => ({
  loading: true,
  error: false,
  totalAmount: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const cart = await Api.cart.getCart()
      set(getCartDetails(cart))
    } catch (e) {
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: true } : item
        )
      }))
      const data = await Api.cart.updateQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: false } : item
        )
      }))
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.addItem(values)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        ...state,
        loading: true,
        error: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: true } : item
        )
      }))
      const data = await Api.cart.removeItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set(state => ({
        ...state,
        loading: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: false } : item
        )
      }))
    }
  }
}))