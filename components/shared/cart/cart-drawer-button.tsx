import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { Button } from '../../ui'

interface Props {
	className?: string
	quantity: number
	disabled?: boolean
	type: 'plus' | 'minus'
	onClick: (type: 'plus' | 'minus') => void
}
export const CartDrawerButton: React.FC<Props> = ({
	className,
	type,
	disabled,
	onClick
}) => {
	return (
		<Button
			disabled={disabled}
			onClick={() => onClick(type)}
			variant="outline"
			type="button"
			className={cn(
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
				'w-[30px] h-[30px] rounded-[10px]'
			)}
		>
			{type === 'plus' ? (
				<Plus className={'h-4'} />
			) : (
				<Minus className={'h-4'} />
			)}
		</Button>
	)
}
