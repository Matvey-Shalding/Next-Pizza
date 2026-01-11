'use client'

import { CategoryWithProducts } from '@/@types/CategoryWithProducts'
import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import { Categories, Container } from '..'

export function TopBar({
	className,
	categories,
	children
}: {
	className?: string
	categories: CategoryWithProducts[]
	children?: React.ReactNode
}) {

	return (
		<div
			className={cn(
				className,
				'sticky top-0 bg-white tablet:min-w-192 overflow-x-auto small-phone:py-3 small-laptop:py-5 z-10 shadow-lg shadow-black/5'
			)}
		>
			<Container className="flex items-center gap-x-6 justify-between">
				<Categories categories={categories} />
				{children}
			</Container>
		</div>
	)
}
