import { getCartDetails } from '@/lib/get-cart-details';
import { Api } from '@/services/api-client';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { create } from 'zustand';

export interface CartItemWithIngredients {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	ingredients: Array<{ name: string; price: number }>;
}

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartItemWithIngredients[];

	fetchCartItems: () => Promise<void>;

	updateItemQuantity: (id: number, quantity: number) => Promise<void>;

	//TODO: add types
	addCartItem: (values: CreateCartItemValues) => Promise<void>;

	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>(set => ({
	loading: true,
	error: false,
	totalAmount: 0,
	items: [],
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const cart = await Api.cart.getCart();
			set(getCartDetails(cart));
		} catch (e) {
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.updateQuantity(id, quantity);
			console.log(data);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.addItem(values);
			console.log(data);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	removeCartItem: async (id: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.removeItem(id);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
}));
