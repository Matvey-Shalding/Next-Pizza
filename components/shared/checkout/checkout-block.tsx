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
				'bg-white small-laptop:py-9 tablet:py-7 phone:py-5 small-phone:py-4 rounded-[30px] flex flex-col small-laptop:gap-y-9 tablet:gap-y-7 phone:gap-y-5 small-phone:gap-y-4',
				className
			)}
		>
			<div className="flex items-center justify-between small-laptop:pb-6 tablet:pb-5 phone:pb-4 small-phone:pb-3 border-b border-gray-200 px-9">
				<Title
					text={title}
					size='lg'
					className="font-bold small-laptop:text-[24px]! tablet:text-[22px]! phone:text-[20px]! small-phone:text-[18px]!"
				/>
				{endAdornment}
			</div>
			<div className="small-laptop:px-9 tablet:px-7 phone:px-5 small-phone:px-4">{children}</div>
		</div>
	)
}
