import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
interface Props {
	className?: string;
	id: number;
	price: number;
	imageUrl: string;
	name: string;
}
export const ProductCard: React.FC<Props> = ({ className, id, name, imageUrl, price }) => {
	return (
		<div className={cn(className, 'flex flex-col gap-y-4')}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-70'>
					{/* <Image width={285} height={260} src={imageUrl} alt='Logo' /> */}
					<img src={imageUrl} width={285} alt="Logo" />
				</div>
			</Link>
			<div className='flex flex-col gap-y-3'>
				<div className='flex flex-col gap-y-2'>
					<Title text={name} size='sm' className='font-bold' />
					<p className='text-sm text-gray-400'>
						Chicken, mozzarella, cheddar and parmesan cheeses, cheese sauce, tomatoes, Alfredo sauce, garlic
					</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[20px]">{price} $</span>
          <Button variant='secondary' className='text-base font-bold'>
            <Plus className='size-5 mr-1' />
            <span>Add</span>
          </Button>
        </div>
			</div>
		</div>
	);
};
