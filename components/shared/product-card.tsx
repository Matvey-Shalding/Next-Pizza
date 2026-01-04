'use client'

import { cn } from '@/lib/utils'
import { Ingredient } from '@/prisma/generated/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Title } from '.'
import { Button } from '../ui'

interface Props {
	className?: string
	id: number
	price: number
	imageUrl: string
	name: string
	ingredients: Ingredient[]
}

export const ProductCard = React.memo(function ProductCard({
	className,
	id,
	name,
	imageUrl,
	ingredients,
	price
}: Props) {
	const ingredientList = ingredients.map(i => i.name.toLowerCase()).join(', ')
	const formattedPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(price)

	return (
		<div
			className={cn(
				className,
				'flex flex-col gap-y-4 transform transition duration-200 ease-out hover:scale-[1.01] hover:shadow-lg rounded-lg'
			)}
		>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-70 overflow-hidden">
					<img
						src={imageUrl}
						width={285}
						height={280}
						alt={name}
						className="object-contain rounded-md transition-transform duration-300 hover:scale-105"
						loading="lazy"
					/>
				</div>
			</Link>

			<div className="flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-2">
					<Title
						text={name}
						size="sm"
						className="font-bold"
					/>
					<p className="text-sm text-gray-400">{ingredientList}</p>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-[20px]">{formattedPrice}</span>
					<Link href={`/product/${id}`}>
						<Button
							variant="secondary"
							className="text-base font-bold"
							aria-label={`Add ${name} to cart`}
						>
							<Plus className="size-5 mr-1" />
							<span>Add</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
})
