import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from '..'
interface Props {
	className?: string
	endAdornment?: React.ReactNode
	title: string
	children: React.ReactNode
}
export const CheckoutBlock: React.FC<Props> = ({
	className,
	title,
	endAdornment,
	children
}) => {
	return (
		<div
			className={cn(
				'bg-white py-9 rounded-[30px] flex flex-col gap-y-9',
				className,

			)}
		>
			<div className="flex items-center justify-between pb-6 border-b border-gray-200 px-9">
				<Title
					text={title}
					size="lg"
					className="font-bold text-[24px]"
				/>
				{endAdornment}
			</div>
			<div className='px-9'>{children}</div>
		</div>
	)
}
