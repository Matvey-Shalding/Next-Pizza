'use client'

import { Input, Skeleton } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { useSearchProducts } from '@/hooks/use-search-products'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useMedia } from 'react-use'
import { Drawer } from '../drawer'

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

	const isTablet = useMedia('(max-width: 1024px)', false)

	// 🔥 UNIVERSAL RESULTS BLOCK WITH FALLBACK
	const results = loading ? (
		<div className="flex flex-col gap-y-2 p-4">
			{Array.from({ length: 5 }).map((_, i) => (
				<Skeleton
					key={i}
					className="w-full min-h-12.5"
				/>
			))}
		</div>
	) : products.length === 0 ? (
		<div className="p-6 text-center text-gray-500 text-sm">
			Nothing was found
		</div>
	) : (
		products.map(product => (
			<Link
				onClick={reset}
				href={`/product/${product.id}`}
				key={product.id}
				className="min-h-12.5 px-5 flex items-center gap-x-3 cursor-pointer transition-colors duration-150 hover:bg-primary/10 py-1 border-b border-gray-200"
			>
				<img
					className="size-7.5 rounded object-cover transition-transform duration-200 hover:scale-105"
					src={product.imageUrl}
					alt={product.name}
				/>
				<span>{product.name}</span>
			</Link>
		))
	)

	// 🔥 DESKTOP VIEW
	if (!isTablet) {
		return (
			<div
				ref={ref}
				className={cn(className, 'relative z-30 w-full basis-full')}
			>
				<Input
					onFocus={() => setIsFocused(true)}
					className={cn(
						'bg-[url(/search.svg)] bg-white pl-8 h-12 pb-0 bg-size-[14px] rounded-2xl bg-no-repeat bg-position-[0.75rem_center]',
						'transition-all duration-300 relative z-30',
						isFocused ? 'shadow-lg ring-2 ring-primary/20' : ''
					)}
					placeholder="Search..."
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>

				{/* BACKDROP */}
				<AnimatePresence>
					{isFocused && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="fixed inset-0 bg-black z-20"
							onClick={() => setIsFocused(false)}
						/>
					)}
				</AnimatePresence>

				{/* RESULTS MODAL */}
				<AnimatePresence>
					{isFocused && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.25, ease: 'easeOut' }}
							className="fixed w-full max-w-lg bg-white top-24 left-1/2 -translate-x-1/2 shadow-xl rounded-xl overflow-hidden z-30"
							onClick={e => e.stopPropagation()}
						>
							{results}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		)
	}

	// 🔥 MOBILE/TABLET VIEW → DRAWER
	return (
		<div
			ref={ref}
			className={cn(className, 'relative z-30')}
		>
			{!isFocused && (
				<Button
					variant="secondary"
					onClick={() => setIsFocused(true)}
					className="flex items-center gap-x-2 px-4 py-2 rounded-full"
				>
					<Search className="w-5 h-5" />
					<span>Search</span>
				</Button>
			)}

			<Drawer
				open={isFocused}
				setOpen={setIsFocused}
				width="400px"
				background="bg-white"
				zIndex="z-50"
				side="right"
				title="Search"
			>
				<div className="p-4 border-b border-border">
					<Input
						autoFocus
						className="w-full pb-0 h-12 rounded-xl pl-8 bg-[url(/search.svg)] bg-no-repeat bg-[length:14px] bg-[left_0.75rem_center]"
						placeholder="Search..."
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
				</div>

				{/* 🔥 SAME RESULTS BLOCK HERE */}
				<div>{results}</div>
			</Drawer>
		</div>
	)
}
