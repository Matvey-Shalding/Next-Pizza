import { CartItemDTO } from '@/services/dto/cart.dto';

export const getCartItemPrice = (item: CartItemDTO) => {
	return (item.productItem.price + item.ingredients.reduce((acc, ing) => acc + ing.price, 0)) * item.quantity;
};
