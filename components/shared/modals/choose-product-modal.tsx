'use client';

import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { ProductWithIngredients } from '@/types';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ProductForm } from '../product-form';

interface Props {
	className?: string;
	product: ProductWithIngredients;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent showCloseButton={false} className='min-w-250 max-h-145 overflow-hidden p-0! rounded-4xl shadow-popup bg-white'>
				<ProductForm product={product} />

				{/* Custom close button */}
				<DialogClose asChild>
					<X width={30} stroke='#99a1af ' height={30} className='stroke-gray-400 absolute right-4 top-4' />
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
