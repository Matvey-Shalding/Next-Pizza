'use client';

import { Button } from '@/components/ui'
import { PizzaSize, PizzaType, mapPizzaType } from '@/constants/pizza'
import { ProductFormContext } from '@/context/ProductForm'
import { usePizzaPrice, useValidatedPizzaSelection } from '@/hooks'
import { cn } from '@/lib/utils'
import { Ingredient, ProductItem } from '@/prisma/generated/prisma'
import React, { useContext, useMemo, useState } from 'react'
import { useSet } from 'react-use'
import { PizzaFormIngredients, PizzaFormSelectors, PizzaImage, Title } from '..'

interface Props {
	className?: string;
	name: string;
	imageUrl: string;
	items: ProductItem[];
	ingredients: Ingredient[];
	onSubmit: (productId: number, ingredients: number[]) => void;
	loading?: boolean;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	className,
	name,
	imageUrl,
	items,
	ingredients,
	onSubmit,
	loading,
}) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

	const inline = useContext(ProductFormContext);

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

	const description = useMemo(() => {
		return `${size} cm, ${mapPizzaType[type].toLowerCase()} dough`
	},[size, type]);

	return (
		<div
			className={cn(className, 'flex', {
				'gap-x-11': inline,
				'gap-x-1': !inline,
			})}
		>
			<div
				className={cn('grid place-content-center', {
					'basis-1/2': !inline,
					'basis-143 shrink-0 size-143 bg-[#FFF7EE] rounded-[20px]': inline,
				})}
			>
				<PizzaImage imageUrl={imageUrl} size={size} />
			</div>
			<div
				className={cn('flex flex-col gap-y-4 basis-full', {
					'overflow-auto scrollbar max-h-145 bg-[#F4F1EE] basis-1/2 p-10': !inline,
				})}
			>
				<div className='flex flex-col gap-y-1'>
					<h1>
						<Title size='sm' className='font-bold' text={name} />
					</h1>
					<span className='text-[#777777] text-sm'>
						{description}
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

				<Button loading={loading} onClick={() => onSubmit(currentId!, Array.from(selectedIngredients))}>
					Add to cart for ${currentPrice.toFixed(2)}
				</Button>
			</div>
		</div>
	);
};
