import React from 'react';
interface Props {
	className?: string;
	name: string;
	imageUrl: string;
}
export const ChooseProductForm: React.FC<Props> = ({ className }) => {
	return <div className={className}>Product</div>;
};
