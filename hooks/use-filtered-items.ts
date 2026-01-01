'use client'

import { FilterCheckboxProps } from '@/components/shared/filters/filter-checkbox'
import { useMemo } from 'react'

interface Params {
	items: FilterCheckboxProps[]
	selectedIds: Set<string>
	limit: number
	showAll: boolean
	showSearch: boolean
	searchValue: string
}

export function useFilteredItems({
	items,
	selectedIds,
	limit,
	showAll,
	showSearch,
	searchValue
}: Params) {
	return useMemo(() => {
		let baseList = items

		if (showAll && showSearch && searchValue) {
			const term = searchValue.toLowerCase()
			baseList = items.filter(item => item.text.toLowerCase().includes(term))
		}

		if (!showAll) {
			const selected = items.filter(item => selectedIds.has(item.value))
			const unselected = baseList.filter(item => !selectedIds.has(item.value))
			baseList = [...selected, ...unselected].slice(0, limit)
		}

		return [...baseList].sort((a, b) => {
			const aChecked = selectedIds.has(a.value)
			const bChecked = selectedIds.has(b.value)
			if (aChecked && !bChecked) return -1
			if (!aChecked && bChecked) return 1
			return 0
		})
	}, [items, selectedIds, limit, showAll, showSearch, searchValue])
}
