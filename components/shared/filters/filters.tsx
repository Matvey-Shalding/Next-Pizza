'use client'

import { Button } from '@/components/ui'
import { doughs, sizes } from '@/constants/filters'
import { useFilters, useIngredients, useQueryIngredients } from '@/hooks'
import { cn } from '@/lib/utils'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { CheckboxFiltersGroup, Title } from '..'
import { Drawer } from '../drawer'
import { PriceRange } from './price-range'

export function Filters({ className }: { className?: string }) {
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()
	useQueryIngredients(filters)

	const [open, setOpen] = useState(false)

	const content = (
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
	)

	return (
		<div className={cn(className)}>
			{/* DESKTOP INLINE FILTERS (≥1024px) */}
			<div className="hidden small-laptop:flex basis-62.5 flex-col gap-y-5">
				<Title
					text="Filters"
					size="lg"
					className="font-extrabold small-laptop:text-[32px] phone:text-[26px]"
				/>
				{content}
			</div>

			{/* MOBILE + TABLET (<1024px) */}
			<div className="small-laptop:hidden">
				<Button
					onClick={() => setOpen(true)}
					className="flex items-center gap-x-2"
				>
					<Filter size={18} />
					<span className="font-medium">Filters</span>
				</Button>

				<Drawer
					side="left"
					open={open}
					setOpen={setOpen}
					width="320px"
					background="bg-white"
					zIndex="z-100"
					title="Filters"
				>
					<div className="px-5 flex-1">{content}</div>
				</Drawer>
			</div>
		</div>
	)
}
