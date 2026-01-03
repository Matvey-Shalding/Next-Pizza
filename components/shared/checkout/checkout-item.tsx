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
				'w-full pb-6 border-b border-gray-200 flex items-center justify-between',
				{ 'opacity-50 pointer-events-none': disabled }
			)}
		>
			<div className="flex items-center gap-x-5">
				<img
					className="size-15"
					src={imageUrl}
					alt=""
				/>
				<div className="flex flex-col gap-y-0.5 min-w-60 text-left max-w-60">
					<span className="font-bold text-black">{name}</span>
					<span className="text-sm text-[#A1A1A1]">{description}</span>
				</div>
			</div>
			<span className="text-black font-bold inline-block ml-21">{price}$</span>
			<div className="flex items-center gap-x-4 ml-26">
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
				<X
					onClick={() => onRemoveItem()}
					className="size-4.5"
				/>
			</div>
		</div>
	)
}
