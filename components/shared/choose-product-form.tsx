import { cn } from '@/lib/utils';
import { ProductItem } from '@/prisma/generated/prisma';
import React from 'react';
import { Title } from '.';
import { Button } from '../ui';
interface Props {
	className?: string;
	name: string;
	imageUrl: string;
	items: ProductItem[];
	onSubmit: (productId: number) => void;
}
export const ChooseProductForm: React.FC<Props> = ({ className, imageUrl, name, items, onSubmit }) => {
	return (
		<div className={cn(className, 'flex gap-x-1')}>
			<div className='bg-white h-full basis-1/2 grid place-content-center'>
				<img src={imageUrl} />
			</div>
			<div className='basis-1/2 h-full flex flex-col justify-between  bg-[#F4F1EE] p-10'>
				<Title size='sm' className='font-bold' text={name} />
				<Button onClick={() => onSubmit(items[0].id)}>Add to cart for ${items[0].price}$</Button>
			</div>
		</div>
	);
};
