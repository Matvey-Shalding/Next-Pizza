'use client';

import { Button } from '@/components/ui';
import { DialogTitle } from '@/components/ui/dialog';
import { PizzaSize, PizzaType, mapPizzaType } from '@/constants/pizza';
import { usePizzaPrice, useValidatedPizzaSelection } from '@/hooks';
import { cn } from '@/lib/utils';
import { Ingredient, ProductItem } from '@/prisma/generated/prisma';
import React, { useMemo, useState } from 'react';
import { useSet } from 'react-use';
import { PizzaFormIngredients, PizzaFormSelectors, PizzaImage, Title } from '..';

interface Props {
	className?: string;
	name: string;
	imageUrl: string;
	items: ProductItem[];
	ingredients: Ingredient[];
	onSubmit: (productId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	className,
	name,
	imageUrl,
	items,
	ingredients,
	onSubmit,
}) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

	const currentId = useMemo(() => {
		return items.find(item => item.size === size && item.pizzaType === type)?.id;
	}, [items, size, type]);

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

				<Button onClick={() => onSubmit(currentId!, Array.from(selectedIngredients))}>
					Add to cart for ${currentPrice.toFixed(2)}
				</Button>
			</div>
		</div>
	);
};
