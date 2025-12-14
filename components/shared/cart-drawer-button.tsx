import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import React, { useCallback } from 'react';
import { Button } from '../ui';

interface Props {
	className?: string;
	setQuantity: React.Dispatch<React.SetStateAction<number>>;
	disabled?: boolean;
	type: 'plus' | 'minus';
}
export const CartDrawerButton: React.FC<Props> = ({ className, type, disabled, setQuantity }) => {
	const onClick = useCallback(() => {
		if (disabled) {
			return;
		}

		if (type === 'plus') {
			setQuantity(prev => prev + 1);
		} else {
			setQuantity(prev => prev - 1);
		}
	}, [setQuantity, type,disabled]);

	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			variant='outline'
			type='button'
			className={cn(
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
				'w-[30px] h-[30px] rounded-[10px]'
			)}
		>
			{type === 'plus' ? <Plus className={'h-4'} /> : <Minus className={'h-4'} />}
		</Button>
	);
};
