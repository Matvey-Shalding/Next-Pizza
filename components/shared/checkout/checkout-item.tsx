'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React from 'react'
import { CartDrawerButton } from '..'
import { CartDrawerItemProps } from '../cart/cart-drawer-item'

export const CheckoutItem: React.FC<CartDrawerItemProps> = ({
	imageUrl,
	name,
	description,
	price,
	quantity,
	disabled,
	onClickCountButton,
	onRemoveItem
}) => {
	return (
		<div
			className={cn(
				'w-full pb-6 pt-6 border-b border-gray-200 flex items-center justify-between',
				'transition-all duration-300 ease-out',
				'hover:-translate-y-0.5',
				{ 'opacity-50 pointer-events-none': disabled }
			)}
		>
			{/* Image + Info */}
			<div className="flex items-center gap-x-5 group">
				<img
					className="size-15 rounded object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
					src={imageUrl}
					alt={name}
				/>
				<div className="flex flex-col gap-y-0.5 min-w-60 text-left max-w-60">
					<span className="font-bold text-black">{name}</span>
					<span className="text-sm text-[#A1A1A1]">{description}</span>
				</div>
			</div>

			{/* Price */}
			<span className="text-black font-bold inline-block ml-21 transition-transform duration-200 group-hover:scale-105">
				{price}$
			</span>

			{/* Controls */}
			<div className="flex items-center gap-x-4 ml-26">
				<div className="flex items-center gap-x-2">
					<CartDrawerButton
						quantity={quantity}
						onClick={() => onClickCountButton('minus')}
						type="minus"
						disabled={quantity <= 1}
					/>
					<span className="text-black font-bold transition-transform duration-200 group-hover:scale-110">
						{quantity}
					</span>
					<CartDrawerButton
						quantity={quantity}
						type="plus"
						disabled={false}
						onClick={() => onClickCountButton('plus')}
					/>
				</div>

				{/* Remove Icon */}
				<X
					onClick={() => onRemoveItem()}
					className="size-4.5 cursor-pointer transition-transform duration-200 hover:rotate-90 hover:stroke-red-500"
				/>
			</div>
		</div>
	)
}
