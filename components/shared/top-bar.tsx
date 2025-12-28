'use client'

import { cn } from '@/lib/utils'
import { Category } from '@/prisma/generated/prisma'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Categories } from './categories'
import { Container } from './container'
import { SortPopup } from './sort-popup'

export function TopBar({
	className,
	categories
}: {
	className?: string
	categories: Category[]
}) {
	const searchParams = useSearchParams()

	const router = useRouter()

	useEffect(() => {
		if (searchParams.has('paid')) {
			setTimeout(() => {
				router.push('/')
				toast.success('Order successfully paid!')
			}, 500)
		}
	}, [])

	return (
		<div
			className={cn(
				className,
				'sticky top-0 bg-white py-5 z-10 shadow-lg shadow-black/5'
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories categories={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}
