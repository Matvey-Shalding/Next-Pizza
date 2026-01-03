'use client'

import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-hot-toast'
import { CartDrawerButton } from './cart-drawer-button'

interface Props {
	quantity: number
	price: number
	onClickCountButton: (type: 'plus' | 'minus') => void
	onRemoveItem: () => void
}

export const CartItemControls: React.FC<Props> = ({
	quantity,
	price,
	onClickCountButton,
	onRemoveItem
}) => {
	const handleRemove = async () => {
		try {
			await onRemoveItem()
			toast.success('Item removed from cart')
		} catch {
			toast.error('Something went wrong')
		}
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-x-2">
				<CartDrawerButton
					quantity={quantity}
					onClick={() => onClickCountButton('minus')}
					type="minus"
					disabled={quantity <= 1}
				/>
				<span className="text-black font-bold">{quantity}</span>
				<CartDrawerButton
					quantity={quantity}
					type="plus"
					disabled={false}
					onClick={() => onClickCountButton('plus')}
				/>
			</div>
			<div className="flex gap-x-1.5 items-center">
				<span className="text-black font-bold">{price.toFixed(0)}$</span>
				<Trash2Icon
					onClick={handleRemove}
					className="size-5 stroke-gray-400 cursor-pointer transition-colors duration-200 hover:stroke-red-500"
				/>
			</div>
		</div>
	)
}
