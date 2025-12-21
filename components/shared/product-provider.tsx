
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';
import { ProductForm } from './product-form';
interface Props {
	className?: string;
	productId: number;
}
export const ProductProvider: React.FC<Props> = async ({ className, productId }) => {
	const product = await prisma.product.findFirst({
		where: { id: productId },
		include: {
			ingredients: true,
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return <ProductForm product={product} />;
};
