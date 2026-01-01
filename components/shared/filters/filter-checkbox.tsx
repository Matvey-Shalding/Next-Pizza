import React from 'react'
import { Checkbox } from '../../ui'

export interface FilterCheckboxProps {
	text: string
	value: string
	endAdornment?: React.ReactNode // icon in the end of the input
	onCheckedChange?: (checked: boolean) => void
	checked?: boolean
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked
}) => {
	return (
		<label className="flex items-center gap-x-2">
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className="rounded-[8px] size-6"
			/>
			<span className="leading-none cursor-pointer flex-1">{text}</span>
			{endAdornment}
		</label>
	)
}
