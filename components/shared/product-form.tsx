'use client';

import { ProductWithIngredients } from '@/types';
import React, { useMemo } from 'react';
import { ChoosePizzaForm, ChooseProductForm } from '.';
import { useCartStore } from '@/store/cart';
import { stat } from 'fs';
import { ingredients } from '@/prisma/constants';
interface Props {
	className?: string;
	product: ProductWithIngredients;
}
export const ProductForm: React.FC<Props> = ({ className, product }) => {

	const { addCartItem } = useCartStore();

	const onAddProduct = (productId: number) => {
		addCartItem({
			productItemId: productId,
		})
	}

	const onAddPizza = (productId: number, ingredients: number[]) => {
		addCartItem({
			productItemId: productId,
			ingredients: ingredients
		})
	}
	
	const isPizza = useMemo(() => {
		return Boolean(product.items[0].pizzaType);
	}, []);

	if (isPizza) {
		return (
			<ChoosePizzaForm
				onSubmit={onAddPizza}
				name={product.name}
				imageUrl={product.imageUrl}
				items={product.items}
				ingredients={product.ingredients}
			/>
		);
	} else {
		return <ChooseProductForm onSubmit={onAddProduct}  items={product.items} name={product.name} imageUrl={product.imageUrl} />;
	}
};
