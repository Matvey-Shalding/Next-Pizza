'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { useFilteredItems } from '@/hooks'
import { FilterList, LoadingSkeletons, SearchBox } from '.'
import type { FilterCheckboxProps } from './filter-checkbox'

type Item = FilterCheckboxProps

interface Props {
	className?: string
	title: string
	items: Item[]
	limit?: number
	searchInputPlaceholder?: string
	loading: boolean
	selectedIds: Set<string>
	toggle: (key: string) => void
	showAllButton?: boolean
}

export function CheckboxFiltersGroup({
	title,
	items,
	limit = 5,
	searchInputPlaceholder = 'Search...',
	className,
	loading,
	selectedIds,
	toggle,
	showAllButton = false
}: Props) {
	const [showAll, setShowAll] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const showSearch = showAllButton && items.length > limit

	const currentItems = useFilteredItems({
		items,
		selectedIds,
		limit,
		showAll,
		showSearch,
		searchValue
	})

	if (loading) {
		return (
			<LoadingSkeletons
				title={title}
				count={limit}
				showSearch={showSearch}
			/>
		)
	}

	return (
		<div className={cn(className, 'flex flex-col gap-y-3')}>
			<span className="font-bold">{title}</span>

			{showSearch && showAll && (
				<SearchBox
					value={searchValue}
					onChange={setSearchValue}
					placeholder={searchInputPlaceholder}
				/>
			)}

			<AnimatePresence initial={false}>
				<motion.div
					key={showAll ? 'expanded' : 'collapsed'}
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className="overflow-hidden"
				>
					<FilterList
						items={currentItems}
						selectedIds={selectedIds}
						toggle={toggle}
						searchValue={searchValue}
					/>
				</motion.div>
			</AnimatePresence>

			{showSearch && (
				<div className={showAll ? 'border-t border-t-neutral-100 pt-1' : ''}>
					<button
						type="button"
						className="text-primary text-sm"
						onClick={() => setShowAll(prev => !prev)}
					>
						{showAll ? 'Show less' : 'Show all'}
					</button>
				</div>
			)}
		</div>
	)
}
