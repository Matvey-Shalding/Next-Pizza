import { CartDTO } from '@/services/dto/cart.dto';
import { CartItemWithIngredients } from '@/store/cart';
import { getCartItemPrice } from './get-cart-item-price';


interface ReturnProps {
  items: CartItemWithIngredients[];
  totalAmount: number;
}

export const getCartDetails = (cart: CartDTO):ReturnProps => {
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
