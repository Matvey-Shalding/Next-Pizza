'use client'

import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { RangeSlider } from './range-slider'


export interface PriceRangeProps {
	className?: string
	value: { from?: number; to?: number }
	onChange: (next: { from?: number; to?: number }) => void
}

export const PriceRange: React.FC<PriceRangeProps> = ({
	className,
	value,
	onChange
}) => {
	const from = value.from ?? 0
	const to = value.to ?? 1000

	const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === '' ? 0 : Number(e.target.value)
		onChange({ ...value, from: val })
	}

	const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === '' ? 1000 : Number(e.target.value)
		onChange({ ...value, to: val })
	}

	const handleSliderChange = ([nextFrom, nextTo]: number[]) => {
		onChange({ from: nextFrom, to: nextTo })
	}

	return (
		<div
			className={cn(
				'border-y border-y-neutral-100 pt-6 pb-7 flex flex-col gap-y-3',
				className
			)}
		>
			<span className="font-bold">Price range</span>

			<div className="flex gap-3">
				<Input
					className="h-10 pb-0 pl-4"
					type="number"
					min={0}
					max={1000}
					value={from}
					onChange={handleFromChange}
				/>
				<Input
					className="h-10 pb-0 pl-4"
					type="number"
					min={0}
					max={1000}
					value={to}
					onChange={handleToChange}
				/>
			</div>

			<RangeSlider
				min={0}
				max={1000}
				step={10}
				value={[from, to]}
				onValueChange={handleSliderChange}
			/>
		</div>
	)
}
