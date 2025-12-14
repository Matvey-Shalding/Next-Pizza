'use client'

import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';
import { CartDrawer } from './cart-drawer';
interface Props {
	className?: string;
}
export const CartButton: React.FC<Props> = ({ className }) => {

	const [open, setOpen] = React.useState(false);

	return (
		<CartDrawer open={open} setOpen={setOpen}>
			<div onClick={() => setOpen(true)} className={className}>
				<Button className='group relative flex items-center gap-x-3'>
					<span className='font-bold'>520$</span>
					<span className='h-full w-[1px] bg-white/30'></span>
					<div className='relative'>
						<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
							<ShoppingCart className='size-4 stroke-2' />
							<span className='font-bold'>3</span>
						</div>
						<ArrowRight
							className={cn(
								'opacity-0 w-5 h-5 left-0 group-hover:left-2 top-1/2',
								' -translate-y-1/2 absolute transition-all duration-300 group-hover:opacity-100'
							)}
						/>
					</div>
				</Button>
			</div>
		</CartDrawer>
	);
};
