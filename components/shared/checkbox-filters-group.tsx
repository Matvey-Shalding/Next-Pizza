'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { Input } from '../ui';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

export function CheckboxFiltersGroup({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Search...',
	className,
	onChange,
	defaultValue,
}: {
	className?: string;
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string[];
}) {
	const [showAll, setShowAll] = useState<boolean>(false);

	const [searchValue, setSearchValue] = useState('');

	const currentItems = useMemo(() => {
		return showAll
			? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
			: defaultItems.slice(0, limit);
	}, [showAll, items, defaultItems, limit, searchValue]);

	const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}, []);

	return (
		<div className={cn(className, 'flex flex-col gap-y-3')}>
			<span className='font-bold'>{title}</span>

			{/* Animated Search Input */}
			<AnimatePresence>
				{showAll && (
					<motion.div
						key='search-input'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
					>
						<Input
							onChange={onChangeValue}
							placeholder={searchInputPlaceholder}
							className='bg-gray-50 border-none mb-1.5'
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Animated Wrapper around Scrollable List */}
			<AnimatePresence initial={false}>
				<motion.div
					key={showAll ? 'expanded' : 'collapsed'}
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className='overflow-hidden'
				>
					<div className='flex flex-col gap-y-4 pr-2 max-h-96 overflow-auto scrollbar'>
						{currentItems.map(item => (
							<FilterCheckbox
								key={v4()}
								text={item.text}
								value={item.value}
								endAdornment={item.endAdornment}
								checked={false} // temp
								onCheckedChange={() => {}}
							/>
						))}
					</div>
				</motion.div>
			</AnimatePresence>

			{/* Show / Hide Button */}
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 pt-1' : ''}>
					<button className='text-primary' onClick={() => setShowAll(prev => !prev)}>
						{showAll ? 'Hide' : 'Show all'}
					</button>
				</div>
			)}
		</div>
	);
}
