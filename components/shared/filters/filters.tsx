'use client'

import { doughs, sizes } from '@/constants/filters'
import { useFilters, useIngredients, useQueryIngredients } from '@/hooks'
import { cn } from '@/lib/utils'
import { CheckboxFiltersGroup, Title } from '..'
import { PriceRange } from './price-range'

export function Filters({ className }: { className?: string }) {
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()

	useQueryIngredients(filters)

	return (
		<div className={cn(className, 'basis-62.5 flex flex-col gap-y-5')}>
			<Title
				text="Filters"
				size="lg"
				className="font-extrabold"
			/>

			<div className="flex flex-col gap-y-5">
				<CheckboxFiltersGroup
					selectedIds={filters.pizzaTypes}
					toggle={filters.setPizzaTypes}
					loading={loading}
					title="Dough"
					limit={2}
					items={doughs}
				/>

				<CheckboxFiltersGroup
					selectedIds={filters.sizes}
					toggle={filters.setSizes}
					loading={loading}
					title="Sizes"
					limit={3}
					items={sizes}
				/>

				<PriceRange
					value={filters.prices}
					onChange={next => filters.setPrices(next)}
				/>

				<CheckboxFiltersGroup
					showAllButton
					selectedIds={filters.selectedIngredients}
					toggle={filters.setSelectedIngredients}
					loading={loading}
					title="Ingredients"
					limit={6}
					items={ingredients}
				/>
			</div>
		</div>
	)
}
