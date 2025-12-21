import { PizzaSize, PizzaType } from '@/constants/pizza';
import { ProductItem } from '@/prisma/generated/prisma';
import { useEffect } from 'react';

/**
 * Ensures the (size, type) combo is valid given available product items.
 * Auto-corrects to a valid combo using this priority:
 * 1. Keep current size, find valid type
 * 2. Keep current type, find valid size
 * 3. Fallback to first available item
 */
export const useValidatedPizzaSelection = ({
	size,
	type,
	items,
	onSizeChange,
	onTypeChange,
}: {
	size: PizzaSize;
	type: PizzaType;
	items: ProductItem[];
	onSizeChange: (size: PizzaSize) => void;
	onTypeChange: (type: PizzaType) => void;
}) => {
	useEffect(() => {
		const isValidCombo = items.some(item => item.size === size && item.pizzaType === type);

		if (!isValidCombo && items.length > 0) {
			// Strategy 1: Keep size, find valid type
			const validTypesForSize = items.filter(item => item.size === size).map(item => item.pizzaType);

			if (validTypesForSize.length > 0) {
				onTypeChange(validTypesForSize[0] as PizzaType);
				return;
			}

			// Strategy 2: Keep type, find valid size
			const validSizesForType = items.filter(item => item.pizzaType === type).map(item => item.size);

			if (validSizesForType.length > 0) {
				onSizeChange(validSizesForType[0] as PizzaSize);
				return;
			}

			// Strategy 3: Fallback to first item
			const firstItem = items[0];
			onSizeChange(firstItem.size as PizzaSize);
			onTypeChange(firstItem.pizzaType as PizzaType);
		}
	}, [size, type, items, onSizeChange, onTypeChange]);
};
