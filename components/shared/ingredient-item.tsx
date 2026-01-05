'use client'

import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

interface Props {
	imageUrl: string
	name: string
	price: number
	active?: boolean
	onClick?: () => void
	className?: string
}

export const IngredientItem = React.memo(function IngredientItem({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick
}: Props) {
	const formattedPrice = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB'
	}).format(price)

	return (
		<div
			role="button"
			aria-pressed={active}
			onClick={onClick}
			className={cn(
				'group flex items-center flex-col p-2 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
				'transition-all duration-200 ease-out',
				'hover:shadow-lg hover:scale-105 hover:border-primary',
				'active:scale-95 active:shadow-sm',
				{
					'border-2 border-primary ring-2 ring-primary/30': active
				},
				className
			)}
		>
			{active && (
				<CircleCheck className="absolute top-2 right-2 text-primary transition-opacity duration-200" />
			)}
			<img
				width={110}
				height={110}
				src={imageUrl}
				alt={name}
				className="rounded-md transition-transform duration-200 group-hover:rotate-1"
				loading="lazy"
			/>
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold">{formattedPrice}</span>
		</div>
	)
})
