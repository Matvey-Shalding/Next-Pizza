'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { CartItemControls } from './cart-item-controls'

export interface CartDrawerItemProps {
	name: string
	description: string
	imageUrl: string
	price: number
	quantity: number
	onClickCountButton: (type: 'plus' | 'minus') => void
	onRemoveItem: () => void
	disabled?: boolean
}

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
	name,
	description,
	imageUrl,
	price,
	quantity,
	onClickCountButton,
	onRemoveItem,
	disabled
}) => {
	return (
		<div
			className={cn(
				'bg-white p-3 phone:p-5 flex gap-x-3 phone:gap-x-6 rounded-md transition-all duration-300 ease-out',
				'hover:shadow-md hover:scale-[1.02] hover:bg-gray-50',
				{ 'opacity-50 pointer-events-none scale-95': disabled }
			)}
		>
			<img
				src={imageUrl}
				alt={name}
				className="phone:size-15 size-14 rounded object-cover"
				loading="lazy"
			/>
			<div className="flex flex-col gap-y-3 basis-full">
				<div className="flex flex-col">
					<span className="font-bold text-black">{name}</span>
					{description && (
						<span className="text-xs mt-0.5 text-[#A1A1A1]">{description}</span>
					)}
				</div>
				<div className="w-full h-px bg-[#EDEDED]" />
				<CartItemControls
					quantity={quantity}
					price={price}
					onClickCountButton={onClickCountButton}
					onRemoveItem={onRemoveItem}
				/>
			</div>
		</div>
	)
}
