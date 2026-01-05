import { PriceRange } from '@/@types'
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface Ingredient {
	text: string;
	value: string;
}

export const useFilters = () => {
	const params = useSearchParams();

	const priceFrom = useMemo(() => {
		return params.get('priceFrom');
	}, [params]);

	const priceTo = useMemo(() => {
		return params.get('priceTo');
	}, [params]);

	const [prices, setPrices] = useState<PriceRange>({
		from: priceFrom !== null ? Number(priceFrom) : undefined,
		to: priceTo !== null ? Number(priceTo) : undefined,
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
