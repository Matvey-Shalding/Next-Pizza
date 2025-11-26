// components/pizza-base-selector.tsx
import { PizzaSize, PizzaType, pizzaSizes, pizzaTypes } from '@/constants/pizza';
import { ProductItem } from '@prisma/client';
import { useMemo } from 'react';
import { Toggles } from '../toggles';

interface Props {
	size: PizzaSize;
	type: PizzaType;
	items: ProductItem[];
	onSizeChange: (size: PizzaSize) => void;
	onTypeChange: (type: PizzaType) => void;
}

export const PizzaFormSelectors = ({ size, type, items, onSizeChange, onTypeChange }: Props) => {
	// Only disable types based on CURRENT size (sizes are always enabled)
	const availablePizzaTypes = useMemo(() => {
		return items.filter(item => item.size === size).map(item => item.pizzaType) as PizzaType[];
	}, [items, size]);

	// Size toggle items - ALWAYS ENABLED
	const sizeToggleItems = useMemo(
		() =>
			pizzaSizes.map(s => ({
				name: s.name,
				value: String(s.value),
				disabled: false, // ✅ Never disabled
			})),
		[]
	);

	// Type toggle items - disabled based on current size
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
		<div className='flex flex-col gap-y-2'>
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
