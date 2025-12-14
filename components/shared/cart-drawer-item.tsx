// components/cart/cart-drawer-item.tsx
'use client';

import { CartDrawerButton } from './cart-drawer-button';
import React from 'react';

export interface CartDrawerItemProps {
	name: string;
	description: string;
	imageUrl: string;
	price: number;
}

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({ name, description, imageUrl, price }) => {
	const [quantity, setQuantity] = React.useState(1);

	return (
		<div className='bg-white p-5 flex gap-x-6'>
			<img className='size-15 rounded object-cover' src={imageUrl} alt={name} />
			<div className='flex flex-col gap-y-3 basis-full'>
				<div className='flex flex-col gap-y-0.5'>
					<span className='font-bold text-black'>{name}</span>
					<span className='text-xs text-[#A1A1A1]'>{description}</span>
				</div>
				<div className='w-full h-px bg-[#EDEDED]'></div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-2'>
						<CartDrawerButton
							type='minus'
							disabled={quantity <= 1}
							setQuantity={() => setQuantity(q => Math.max(1, q - 1))}
						/>
						<span className='text-black font-bold'>{quantity}</span>
						<CartDrawerButton type='plus' disabled={false} setQuantity={() => setQuantity(q => q + 1)} />
					</div>
					<span className='text-black font-bold'>{(price * quantity).toFixed(0)}$</span>
				</div>
			</div>
		</div>
	);
};
