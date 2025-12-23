'use client';

import { cn } from '@/lib/utils'
import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { CartDrawerButton } from './cart-drawer-button'

export interface CartDrawerItemProps {
	name: string;
	description: string;
	imageUrl: string;
	price: number;
	quantity: number;
	onClickCountButton: (type: 'plus' | 'minus') => void;
	onRemoveItem: () => void;
	disabled?: boolean;
}

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
	name,
	description,
	imageUrl,
	price,
	quantity,
	onRemoveItem,
	onClickCountButton,
	disabled
}) => {

	return (
		<div className={cn('bg-white p-5 flex gap-x-6', { 'opacity-50 pointer-events-none': disabled })}>
			<img className='size-15 rounded object-cover' src={imageUrl} alt={name} />
			<div className='flex flex-col gap-y-3 basis-full'>
				<div className='flex flex-col'>
					<span className='font-bold text-black'>{name}</span>
					{description && <span className='text-xs mt-0.5 text-[#A1A1A1]'>{description}</span>}
				</div>
				<div className='w-full h-px bg-[#EDEDED]'></div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-2'>
						<CartDrawerButton
							quantity={quantity}
							onClick={() => onClickCountButton('minus')}
							type='minus'
							disabled={quantity <= 1}
						/>
						<span className='text-black font-bold'>{quantity}</span>
						<CartDrawerButton
							quantity={quantity}
							type='plus'
							disabled={false}
							onClick={() => onClickCountButton('plus')}
						/>
					</div>
					<div className='flex gap-x-1.5'>
						<span className='text-black font-bold'>{price.toFixed(0)}$</span>
						<Trash2Icon onClick={onRemoveItem} className='size-5 stroke-gray-400' />
					</div>
				</div>
			</div>
		</div>
	);
};
