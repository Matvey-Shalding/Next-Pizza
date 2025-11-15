'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { v4 } from 'uuid';
import { ProductCard } from './product-card';
import { Title } from './title';
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
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId);

	const intersectionRef = useRef<HTMLDivElement>(null);

	const intersection = useIntersection(intersectionRef as any, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersection?.isIntersecting, categoryId]);

	return (
		<div id={title} ref={intersectionRef} className={cn(className, 'flex flex-col gap-y-5')}>
			<Title text={title} size='lg' className='font-extrabold' />
			<div className={cn(listClassName, 'grid gap-16 grid-cols-[repeat(auto-fit,_285px)]')}>
				{products.map((product, i) => (
					<ProductCard
						key={v4()}
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
