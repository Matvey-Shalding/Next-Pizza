'use client'

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { ProductCard } from './product-card';
import { Title } from './title';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';
interface Props {
	className?: string;
	title: string;
	products: any[];
	categoryId: number;
	listClassName?: string;
}
export const ProductsGroupList: React.FC<Props> = ({
	className,
	title,
	products,
	categoryId,
	listClassName,
}) => {

	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)

	const intersectionRef = useRef<HTMLDivElement>(null);

	const intersection = useIntersection(intersectionRef as any, {
		threshold: 0.4
	})

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	},[intersection?.isIntersecting,categoryId])

	return (
		<div id={title} ref={intersectionRef} className={cn(className, 'flex flex-col gap-y-5')}>
			<Title text={title} size='lg' className='font-extrabold' />
			<div className={cn(listClassName, 'grid gap-16 grid-cols-[repeat(auto-fit,_285px)]')}>
				{products.map((product, i) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
					/>
				))}
			</div>
		</div>
	);
};
