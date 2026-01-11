'use client'

import { Button } from '@/components/ui'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { ProductFormContext } from '@/context/ProductForm'
import { usePizzaPrice, useValidatedPizzaSelection } from '@/hooks'
import { getItemDetails } from '@/lib/get-item-details'
import { cn } from '@/lib/utils'
import { Ingredient, ProductItem } from '@/prisma/generated/prisma'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useSet } from 'react-use'
import { PizzaFormIngredients, PizzaFormSelectors, PizzaImage, Title } from '..'

interface Props {
	className?: string
	name: string
	imageUrl: string
	items: ProductItem[]
	ingredients: Ingredient[]
	onSubmit: (productId: number, ingredients: number[]) => void
	loading?: boolean
}

export const ChoosePizzaForm: React.FC<Props> = ({
	className,
	name,
	imageUrl,
	items,
	ingredients,
	onSubmit,
	loading
}) => {
	const [size, setSize] = useState<PizzaSize>(20)
	const [type, setType] = useState<PizzaType>(1)
	const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
		new Set<number>()
	)

	const inline = useContext(ProductFormContext)

	const currentId = useMemo(() => {
		return items.find(item => item.size === size && item.pizzaType === type)?.id
	}, [items, size, type])

	const currentIngredients = useMemo(() => {
		return ingredients.filter(ing => selectedIngredients.has(ing.id))
	}, [selectedIngredients, ingredients])

	useValidatedPizzaSelection({
		size,
		type,
		items,
		onSizeChange: setSize,
		onTypeChange: setType
	})

	const currentPrice = usePizzaPrice(
		items,
		size,
		type,
		ingredients,
		selectedIngredients
	)

	const handleToggle = useCallback(
		(id: number) => toggleIngredient(id),
		[toggleIngredient]
	)

	return (
		<div
			className={cn(
				// Desktop behavior
				'flex self-stretch overflow-y-auto',

				// Mobile (<640px) — enable scrolling
				'max-xs:h-full max-xs:overflow-y-auto',

				{
					'gap-x-11': inline,
					'gap-x-1': !inline
				},
				className
			)}
		>
			{/* BIG IMAGE — xl only */}
			<div
				className={cn('hidden xl:grid place-content-center', {
					'basis-1/2': !inline,
					'basis-143 shrink-0 border-r border-gray-200': inline
				})}
			>
				<PizzaImage
					imageUrl={imageUrl}
					size={size}
				/>
			</div>

			{/* RIGHT SIDE */}
			<div
				className={cn('flex flex-col gap-y-4 max-h-full basis-full', {
					'overflow-y-auto scrollbar laptop:max-h-145 bg-[#F4F1EE] laptop:basis-1/2 phone:p-10 p-4':
						!inline
				})}
			>
				{/* TITLE + SMALL IMAGE */}
				<div className="basis-full flex items-center justify-between pr-6">
					<div className="flex flex-col gap-y-1">
						<Title
							size="sm"
							className="font-bold"
							text={name}
						/>

						<span className="text-[#777777] text-sm">
							{getItemDetails(type, size, currentIngredients)}
						</span>
					</div>

					<img
						src={imageUrl}
						alt={name}
						className="block xl:hidden w-[60px] h-[60px] object-contain"
					/>
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
					onToggle={handleToggle}
				/>

				{currentId && (
					<Button
						loading={loading}
						onClick={() => onSubmit(currentId, Array.from(selectedIngredients))}
					>
						Add to cart for ${currentPrice.toFixed(2)}
					</Button>
				)}
			</div>
		</div>
	)
}
