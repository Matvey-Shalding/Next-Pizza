'use client';

import { ProductWithIngredients } from '@/types';
import React, { useMemo } from 'react';
import { ChooseProductForm } from './choose-product-form';
import { ChoosePizzaForm } from './choosePizzaForm/choose-pizza-form';
interface Props {
	className?: string;
	product: ProductWithIngredients;
}
export const ProductForm: React.FC<Props> = ({ className, product }) => {
	const isPizza = useMemo(() => {
		return Boolean(product.items[0].pizzaType);
	}, []);

	if (isPizza) {
		return (
			<ChoosePizzaForm
				name={product.name}
				imageUrl={product.imageUrl}
				items={product.items}
				ingredients={product.ingredients}
			/>
		);
	} else {
		return <ChooseProductForm items={product.items}  name={product.name} imageUrl={product.imageUrl} />;
	}
};
