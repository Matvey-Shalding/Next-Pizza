'use client';

import { Button } from '@/components/ui';
import { DialogTitle } from '@/components/ui/dialog';
import { PizzaSize, PizzaType, mapPizzaType } from '@/constants/pizza';
import { usePizzaPrice } from '@/hooks/use-pizza-price';
import { useValidatedPizzaSelection } from '@/hooks/use-validate-pizza-selection';
import { cn } from '@/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import React, { useState } from 'react';
import { useSet } from 'react-use';
import { PizzaImage } from '../pizza-image';
import { Title } from '../title';
import { PizzaFormIngredients } from './pizza-form-ingredients';
import { PizzaFormSelectors } from './pizza-form-selectors';

interface Props {
	className?: string;
	name: string;
	imageUrl: string;
	items: ProductItem[];
	ingredients: Ingredient[];
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, name, imageUrl, items, ingredients }) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

	useValidatedPizzaSelection({
		size,
		type,
		items,
		onSizeChange: setSize,
		onTypeChange: setType,
	});

	const currentPrice = usePizzaPrice(items, size, type, ingredients, selectedIngredients);

	return (
		<div className={cn(className, 'flex gap-x-1')}>
			<div className='basis-1/2 grid place-content-center'>
				<PizzaImage imageUrl={imageUrl} size={size} />
			</div>
			<div className='flex flex-col gap-y-4 overflow-auto scrollbar max-h-145 basis-1/2 bg-[#F4F1EE] p-10'>
				<div className='flex flex-col gap-y-1'>
					<DialogTitle>
						<Title size='sm' className='font-bold' text={name} />
					</DialogTitle>
					<span className='text-[#777777] text-sm'>
						{size} cm, {mapPizzaType[type].toLowerCase()} dough, ~380 g
					</span>
				</div>

				<PizzaFormSelectors
					size={size}
					type={type}
					items={items}
					onSizeChange={setSize}
					onTypeChange={setType}
				/>

				<PizzaFormIngredients
					ingredients={ingredients}
					selectedIds={selectedIngredients}
					onToggle={toggleIngredient}
				/>

				<Button>Add to cart for ${currentPrice.toFixed(2)}</Button>
			</div>
		</div>
	);
};
