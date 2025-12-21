import { ProductWithIngredients } from '@/types';
import React from 'react';
import { ProductForm } from './product-form';
interface Props {
	product: ProductWithIngredients
}
export const Temp: React.FC<Props> = ({ product }) => {
	return <ProductForm product={product} />;
};
