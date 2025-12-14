import { mapPizzaSize, mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';
import { CartItemWithIngredients } from '@/store/cart';

export const getItemDetails = (
	type: PizzaType,
	size: PizzaSize,
	ingredients: CartItemWithIngredients['ingredients']
): string => {
	const pizzaSize = mapPizzaSize[size] + ' ' + size + ' cm';
	const pizzaType = mapPizzaType[type].toLowerCase() + ' dough';
	const pizzaIngredients = ingredients.map(ing => ing.name.toLowerCase()).join(', ');
	return ` ${pizzaSize}, ${pizzaType} + ${pizzaIngredients}`;
};
