'use client';

import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { Title } from './title';

export function Filters({ className }: { className?: string }) {
	return (
		<div className={cn(className, 'basis-62.5')}>
			<div className='flex flex-col gap-y-5'>
				<div className='flex flex-col gap-y-5'>
					<Title text='Filters' size='sm' className='font-bold' />
					<div className='flex flex-col gap-y-4'>
						<FilterCheckbox text='You can build' value='1' />
						<FilterCheckbox text='New items' value='2' />
					</div>
				</div>
				<div className='border-y border-y-neutral-100 pt-6 pb-7 flex flex-col gap-y-3'>
					<span className='font-bold'>Price range</span>
					<div className='flex gap-3'>
						<Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />
						<Input type='number' min={100} max={1000} value={500} placeholder='500' />
					</div>
					<RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
				</div>
				<CheckboxFiltersGroup
					title='Ingredients'
					className=''
					limit={6}
					items={[
						{ text: 'Cheese sauce', value: '1' },
						{ text: 'Mozzarella', value: '2' },
						{ text: 'Garlic', value: '3' },
						{ text: 'Pickles', value: '4' },
						{ text: 'Red onion', value: '5' },
						{ text: 'Tomatoes', value: '6' },
						{ text: 'Cheese sauce', value: '1' },
						{ text: 'Mozzarella', value: '2' },
						{ text: 'Garlic', value: '3' },
						{ text: 'Pickles', value: '4' },
						{ text: 'Red onion', value: '5' },
						{ text: 'Tomatoes', value: '6' },
					]}
					defaultItems={[
						{ text: 'Cheese sauce', value: '1' },
						{ text: 'Mozzarella', value: '2' },
						{ text: 'Garlic', value: '3' },
						{ text: 'Pickles', value: '4' },
						{ text: 'Red onion', value: '5' },
						{ text: 'Tomatoes', value: '6' },
					]}
				/>
			</div>
		</div>
	);
}
