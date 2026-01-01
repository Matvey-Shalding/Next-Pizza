'use client'

import { Skeleton } from '@/components/ui'

interface Props {
	title: string
	count: number
	showSearch: boolean
}

export function LoadingSkeletons({ title, count, showSearch }: Props) {
	return (
		<div className="flex flex-col gap-y-3">
			<span className="font-bold">{title}</span>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton
					key={index}
					className="mb-2.5 h-6 rounded-lg"
				/>
			))}
			{showSearch && <Skeleton className="w-28 h-6" />}
		</div>
	)
}
