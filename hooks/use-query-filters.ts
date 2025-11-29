import { PriceRange } from '@/types';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useDebounce } from 'react-use';

interface Props {
	sizes: Set<string>;

	pizzaTypes: Set<string>;

	selectedIngredients: Set<string>;

	prices: PriceRange;
}

export const useQueryIngredients = ({ prices, pizzaTypes, sizes, selectedIngredients }: Props) => {
	const router = useRouter();

	useDebounce(
		() => {
			const filters = {
				pizzaTypes: Array.from(pizzaTypes),
				sizes: Array.from(sizes),
				priceFrom: prices.from,
				priceTo: prices.to,
				ingredients: Array.from(selectedIngredients),
			};

			const query = qs.stringify(filters, {
				arrayFormat: 'comma',
			});

			router.push(`?${query}`, {
				scroll: false,
			});
		},
		500,
		[selectedIngredients, sizes, pizzaTypes, prices]
	);
};
