'use client';

import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { RangeSlider } from './range-slider';

import { doughs, sizes } from '@/constants/filters';
import { useFilters, useIngredients, useQueryIngredients } from '@/hooks';

export function Filters({ className }: { className?: string }) {
	const { ingredients, loading } = useIngredients();

	const filters = useFilters();

	useQueryIngredients(filters);

	return (
		<div className={cn(className, 'basis-62.5')}>
			<div className='flex flex-col gap-y-5'>
				<CheckboxFiltersGroup
					selectedIds={filters.pizzaTypes}
					toggle={filters.setPizzaTypes}
					loading={loading}
					title='Dough'
					limit={2}
					items={doughs}
				/>
				<CheckboxFiltersGroup
					selectedIds={filters.sizes}
					toggle={filters.setSizes}
					loading={loading}
					title='Sizes'
					limit={3}
					items={sizes}
				/>
				<div className='border-y border-y-neutral-100 pt-6 pb-7 flex flex-col gap-y-3'>
					<span className='font-bold'>Price range</span>
					<div className='flex gap-3'>
						<Input
							type='number'
							min={0}
							max={1000}
							value={filters.prices.from ?? 0}
							onChange={e => {
								const value = e.target.value === '' ? 0 : Number(e.target.value);
								filters.setPrices(prev => ({ ...prev, from: value }));
							}}
						/>
						<Input
							type='number'
							min={0}
							max={1000}
							value={filters.prices.to ?? 1000}
							onChange={e => {
								const value = e.target.value === '' ? 1000 : Number(e.target.value);
								filters.setPrices(prev => ({ ...prev, to: value }));
							}}
						/>
					</div>
					<RangeSlider
						min={0}
						max={1000}
						step={10}
						value={[filters.prices.from ?? 0, filters.prices.to ?? 1000]}
						onValueChange={([from, to]) => {
							filters.setPrices({
								from,
								to,
							});
						}}
					/>
				</div>
				<CheckboxFiltersGroup
					showAllButton
					selectedIds={filters.selectedIngredients}
					toggle={filters.setSelectedIngredients}
					loading={loading}
					title='Ingredients'
					className=''
					limit={6}
					items={ingredients}
				/>
			</div>
		</div>
	);
}
