'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Input, Skeleton } from '../ui';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

export function CheckboxFiltersGroup({
	title,
	items,
	limit = 5,
	searchInputPlaceholder = 'Search...',
	className,
	loading,
	selectedIds,
	toggle,
	showAllButton = false,
}: {
	className?: string;
	title: string;
	items: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	loading: boolean;
	selectedIds: Set<string>;
	toggle: (key: string) => void;
	showAllButton?: boolean;
}) {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const showSearch = useMemo(() => {
		return showAllButton && items.length > limit;
	}, [showAllButton, limit, items]);

	const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}, []);

	const currentItems = useMemo(() => {
		let baseList = items;

		if (showAll && showSearch && searchValue) {
			const term = searchValue.toLowerCase();
			baseList = items.filter(item => item.text.toLowerCase().includes(term));
		}

		if (!showAll) {
			const selected = items.filter(item => selectedIds.has(item.value));
			const unselected = baseList.filter(item => !selectedIds.has(item.value));
			baseList = [...selected, ...unselected].slice(0, limit);
		}

		return [...baseList].sort((a, b) => {
			const aChecked = selectedIds.has(a.value);
			const bChecked = selectedIds.has(b.value);
			if (aChecked && !bChecked) return -1;
			if (!aChecked && bChecked) return 1;
			return 0;
		});
	}, [items, showAll, selectedIds, limit, searchValue, showSearch]);

	if (loading) {
		return (
			<div className='flex flex-col gap-y-3'>
				<span className='font-bold'>{title}</span>
				{...new Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className='mb-2.5 h-6 rounded-lg' />)}
				{showSearch && <Skeleton className='w-28 h-6' />}
			</div>
		);
	}

	return (
		<div className={cn(className, 'flex flex-col gap-y-3')}>
			<span className='font-bold'>{title}</span>

			<AnimatePresence>
				{showSearch && showAll && (
					<motion.div
						key='search-input'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
					>
						<Input
							value={searchValue}
							onChange={onChangeSearch}
							placeholder={searchInputPlaceholder}
							className='bg-gray-50 border-none mb-1.5'
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Animated list */}
			<AnimatePresence initial={false}>
				<motion.div
					key={showAll ? 'expanded' : 'collapsed'}
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className='overflow-hidden'
				>
					<div className='flex flex-col gap-y-4 pr-2 max-h-96 overflow-auto scrollbar'>
						{currentItems.length > 0 ? (
							currentItems.map(item => (
								<FilterCheckbox
									key={item.value}
									text={item.text}
									value={item.value}
									endAdornment={item.endAdornment}
									checked={selectedIds.has(item.value)}
									onCheckedChange={() => toggle(item.value)}
								/>
							))
						) : (
							<span className='text-muted-foreground text-sm'>{searchValue ? 'No results' : 'No items'}</span>
						)}
					</div>
				</motion.div>
			</AnimatePresence>

			{showSearch && (
				<div className={showAll ? 'border-t border-t-neutral-100 pt-1' : ''}>
					<button
						type='button'
						className='text-primary text-sm'
						onClick={() => {
							setShowAll(prev => !prev);
						}}
					>
						{showAll ? 'Show less' : 'Show all'}
					</button>
				</div>
			)}
		</div>
	);
}
