import { PizzaSize, PizzaType, pizzaSizes, pizzaTypes } from '@/constants/pizza';
import { useMemo } from 'react';
import { Toggles } from '..';
import { ProductItem } from '@/prisma/generated/prisma';

interface Props {
	size: PizzaSize;
	type: PizzaType;
	items: ProductItem[];
	onSizeChange: (size: PizzaSize) => void;
	onTypeChange: (type: PizzaType) => void;
}

export const PizzaFormSelectors = ({ size, type, items, onSizeChange, onTypeChange }: Props) => {
	const availablePizzaTypes = useMemo(() => {
		return items.filter(item => item.size === size).map(item => item.pizzaType) as PizzaType[];
	}, [items, size]);

	const sizeToggleItems = useMemo(
		() =>
			pizzaSizes.map(s => ({
				name: s.name,
				value: String(s.value),
				disabled: false,
			})),
		[]
	);

	const typeToggleItems = useMemo(
		() =>
			pizzaTypes.map(t => ({
				name: t.name,
				value: String(t.value),
				disabled: !availablePizzaTypes.includes(t.value),
			})),
		[availablePizzaTypes]
	);

	return (
		<div className='flex flex-col gap-y-2 max-w-105 -mx-4 p-4 bg-gray-50 rounded-md min-w-full'>
			<Toggles
				selectedValue={String(size)}
				onClick={v => onSizeChange(Number(v) as PizzaSize)}
				items={sizeToggleItems}
			/>
			<Toggles
				selectedValue={String(type)}
				onClick={v => onTypeChange(Number(v) as PizzaType)}
				items={typeToggleItems}
			/>
		</div>
	);
};
