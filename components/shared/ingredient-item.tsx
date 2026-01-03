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

export const IngredientItem: React.FC<Props> = ({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick
}) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex items-center flex-col p-2 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
				'transition-all duration-200 ease-out',
				'hover:shadow-lg hover:scale-105 hover:border-primary',
				'active:scale-98 active:shadow-sm',
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
			/>
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold">{price} ₽</span>
		</div>
	)
}
