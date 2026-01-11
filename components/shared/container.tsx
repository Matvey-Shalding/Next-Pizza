import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	className?: string
	ref?: React.Ref<HTMLDivElement>
}

// Restricts the main content page width to 1280px

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
	ref
}) => {
	return (
		<div
			ref={ref}
			className={cn('mx-auto max-w-340 tablet:px-8 small-phone:px-4 phone:px-6 small-laptop:px-10', className)}
		>
			{children}
		</div>
	)
}
