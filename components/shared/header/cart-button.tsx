'use client';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import React, { useEffect } from 'react';
import { CartDrawer } from '..'
import { Button } from '@/components/ui'
interface Props {
	className?: string;
}
export const CartButton: React.FC<Props> = ({ className }) => {
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			document.body.style.pointerEvents = 'none';
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.pointerEvents = 'unset';
		}
	},[open])

	const { totalAmount, items, loading } = useCartStore();

	return (
		<CartDrawer open={open} setOpen={setOpen}>
			<div onClick={() => setOpen(true)} className={className}>
				<Button
					loading={loading}
					className={cn('group relative flex items-center gap-x-3', { 'w-[105px]': loading })}
				>
					<span className='font-bold'>{totalAmount}$</span>
					<span className='h-full w-[1px] bg-white/30'></span>
					<div className='relative'>
						<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
							<ShoppingCart className='size-4 stroke-2' />
							<span className='font-bold'>{items.length}</span>
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
