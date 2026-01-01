'use client'

import { FilterCheckbox } from '..'
import { FilterCheckboxProps } from './filter-checkbox'

interface Props {
	items: FilterCheckboxProps[]
	selectedIds: Set<string>
	toggle: (key: string) => void
	searchValue: string
}

export function FilterList({ items, selectedIds, toggle, searchValue }: Props) {
	if (items.length === 0) {
		return (
			<span className="text-muted-foreground text-sm">
				{searchValue ? 'No results' : 'No items'}
			</span>
		)
	}

	return (
		<div className="flex flex-col gap-y-4 pr-2 max-h-96 overflow-auto scrollbar">
			{items.map(item => (
				<FilterCheckbox
					key={item.value}
					text={item.text}
					value={item.value}
					endAdornment={item.endAdornment}
					checked={selectedIds.has(item.value)}
					onCheckedChange={() => toggle(item.value)}
				/>
			))}
		</div>
	)
}
