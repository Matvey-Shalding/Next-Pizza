import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSet } from 'react-use';
import { useIngredients } from './use-ingredients';


interface PriceRange {
	from: number;
	to: number;
}

interface Ingredient {
	text: string;
	value: string;
}

export const useFilters = () => {
	const params = useSearchParams();


	const [prices, setPrices] = useState<PriceRange>({
		from: Number(params.get('priceFrom')) ?? 0,
		to: Number(params.get('priceTo')) ?? 1000,
	});

	const [sizes, { toggle: setSizes }] = useSet<string>(
		new Set(params.has('sizes') ? params.get('sizes')?.split(',') : [])
	);

	const [pizzaTypes, { toggle: setPizzaTypes }] = useSet<string>(
		new Set(params.has('pizzaTypes') ? params.get('pizzaTypes')?.split(',') : [])
	);

	const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet<string>(
		new Set(params.has('ingredients') ? params.get('ingredients')?.split(',') : [])
	);

	return {
		prices,
		setPrices,
		sizes,
		setSizes,
		pizzaTypes,
		setPizzaTypes,
		selectedIngredients,
		setSelectedIngredients,
	};
};
