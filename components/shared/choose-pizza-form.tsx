'use client';

import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/constants/pizza';
import { cn } from '@/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import React, { useMemo, useState } from 'react';
import { useSet } from 'react-use';
import { Button } from '../ui';
import { DialogTitle } from '../ui/dialog';
import { IngredientItem } from './ingredient-item';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Toggles } from './toggles';
interface Props {
	className?: string;
	name: string;
	imageUrl: string;
	items: ProductItem[];
	ingredients: Ingredient[];
}
export const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items }) => {
	const [size, setSize] = useState<PizzaSize>(20);

	const [type, setType] = useState<PizzaType>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

	console.log(items);

	const currentPrice = useMemo(() => {
		return (
			Number(items.find(item => item.size === size && item.pizzaType === type)?.price) +
			ingredients.filter(item => selectedIngredients.has(item.id)).reduce((acc, item) => acc + item.price, 0)
		);
	}, [items, selectedIngredients, size, type]);

	const availablePizzaSizes = items
		.filter(item => item.pizzaType === type)
		.map(item => item.size) as PizzaSize[];

	const availablePizzaTypes = items
		.filter(item => item.size === size)
		.map(item => item.pizzaType) as PizzaType[];

	return (
		<div className={cn(className, 'flex gap-x-1')}>
			<div className='basis-1/2 grid place-content-center'>
				<PizzaImage imageUrl={imageUrl} size={size} />
			</div>
			<div className='flex flex-col gap-y-4  overflow-auto scrollbar max-h-145 basis-1/2 bg-[#F4F1EE] p-10'>
				<div className='flex flex-col gap-y-1'>
					<DialogTitle>
						<Title size='sm' className='font-bold' text={name} />
					</DialogTitle>
					<span className='text-[#777777] text-sm'>25 см, традиционное тесто 25, 380 г</span>
				</div>
				<div className='flex flex-col gap-y-2'>
					<Toggles
						onClick={value => setSize(Number(value) as PizzaSize)}
						selectedValue={String(size)}
						items={pizzaSizes}
						// items={pizzaSizes.map(item => ({
						// 	...item,
						// 	disabled: !availablePizzaSizes.includes(Number(item.value) as PizzaSize),
						// }))}
					/>
					<Toggles
						onClick={value => setType(Number(value) as PizzaType)}
						selectedValue={String(type)}
						items={pizzaTypes.map(item => ({
							...item,
							disabled: !availablePizzaTypes.includes(Number(item.value) as PizzaType),
						}))}
					/>
				</div>
				<div className='flex flex-col gap-y-2'>
					<span className='font-semibold text-xl text-black'>Add to taste</span>
					<div className='bg-gray-50 rounded-md -mx-4 py-4 grid place-content-center'>
						<div className='grid grid-cols-3 gap-3'>
							{ingredients.map(ingredient => (
								<IngredientItem
									key={ingredient.id}
									name={ingredient.name}
									price={ingredient.price}
									imageUrl={ingredient.imageUrl}
									onClick={() => addIngredient(ingredient.id)}
									active={selectedIngredients.has(ingredient.id)}
								/>
							))}
						</div>
					</div>
				</div>
				<Button>Add to cart for {currentPrice}$</Button>
			</div>
		</div>
	);
};
