'use client';

import { CartDrawerButton } from './cart-drawer-button';
import { X } from 'lucide-react';
import React from 'react';

export interface CartItemProps {
	id: string | number;
	imageUrl: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	onQuantityChange: (newQuantity: number) => void;
	onRemove?: () => void;
}

export const CartDrawerItem: React.FC<CartItemProps> = ({
	imageUrl,
	name,
	description,
	price,
	quantity,
	onQuantityChange,
	onRemove,
}) => {
	return (
		<div className='bg-white p-5 flex gap-x-6'>
			<img className='size-15 rounded object-cover' src={imageUrl} alt={name} />
			<div className='flex flex-col gap-y-3 basis-full'>
				<div className='flex flex-col gap-y-0.5'>
					<span className='font-bold text-black'>{name}</span>
					<span className='text-xs text-[#A1A1A1]'>{description}</span>
				</div>
				<div className='w-full h-px bg-[#EDEDED]'></div>
				<div className='basis-full flex items-center justify-between'>
					<div className='flex items-center gap-x-2'>
						<CartDrawerButton
							type='minus'
							disabled={quantity <= 1}
							setQuantity={() => onQuantityChange(quantity - 1)}
						/>
						<span className='text-black font-bold'>{quantity}</span>
						<CartDrawerButton
							type='plus'
							disabled={false}
							setQuantity={() => onQuantityChange(quantity + 1)}
						/>
					</div>
					<span className='text-black font-bold'>{price}$</span>
					{onRemove && (
						<button onClick={onRemove} className='ml-2 p-1 text-gray-400 hover:text-gray-600'>
							<X className='size-4' />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
