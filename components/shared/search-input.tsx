'use client'

import { useSearchProducts } from '@/hooks/use-search-products'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Input, Skeleton } from '../ui'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const {
		ref,
		products,
		searchValue,
		setSearchValue,
		isFocused,
		setIsFocused,
		loading,
		reset
	} = useSearchProducts()

	return (
		<>
			<div
				className={cn(
					'fixed inset-0 bg-black/50 z-20 transition-opacity duration-200',
					isFocused
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				)}
			/>

			<div
				ref={ref}
				className={cn(className, 'relative z-30')}
			>
				<Input
					onFocus={() => setIsFocused(true)}
					className={cn(
						'bg-[url(/search.svg)] bg-white pl-8 h-12 pb-0 bg-size-[14px] rounded-2xl bg-no-repeat bg-position-[0.75rem_center]',
						'transition-all duration-300',
						isFocused ? 'shadow-lg ring-2 ring-primary/20' : ''
					)}
					placeholder="Search..."
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>

				<div
					className={cn(
						'absolute w-full bg-white top-15 left-0 shadow-xl rounded-xl overflow-hidden',
						'transition-all duration-250 ease-out',
						isFocused
							? 'opacity-100 translate-y-0'
							: 'opacity-0 -translate-y-2 pointer-events-none'
					)}
				>
					{loading ? (
						<div className="flex flex-col gap-y-2 p-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton
									key={i}
									className="w-full min-h-12.5"
								/>
							))}
						</div>
					) : (
						products.map(product => (
							<Link
								onClick={reset}
								href={`/product/${product.id}`}
								key={product.id}
								className="min-h-12.5 px-5 flex items-center gap-x-3 cursor-pointer transition-colors duration-150 hover:bg-primary/10"
							>
								<img
									className="size-7.5 rounded object-cover transition-transform duration-200 hover:scale-105"
									src={product.imageUrl}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))
					)}
				</div>
			</div>
		</>
	)
}
