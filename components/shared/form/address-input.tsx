import { Input } from '@/components/ui'
import React, { useEffect } from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { Controller, useFormContext } from 'react-hook-form'
interface Props {
	className?: string
}
export const AddressInput: React.FC<Props> = ({ className }) => {
	const { setValue, watch } = useFormContext()

	const value = watch('address')

	useEffect(() => {
		console.log(value)
	}, [value])

	const inputBaseClasses =
		'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ' +
		'dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-[10px] border bg-transparent px-3 py-1 text-base ' +
		'shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
		'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ' +
		'transition-colors duration-300 ease-in-out ' +
		'focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-1 ' +
		'focus-visible:shadow-[0_0_0_1px_hsl(var(--ring)/0.1)] ' +
		'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'

	return (
		<div className="flex flex-col gap-y-2">
			<span className="text-black font-bold text-sm">Shipping address</span>
			<Controller
				render={({ field }) => (
					<AddressSuggestions
						token="bb8187ede29c96c8396fdbc73ced2f71284f2b5a"
						value={value}
						onChange={e => setValue('address', e?.value)}
						inputProps={{
							className: inputBaseClasses
						}}
						customInput={Input}
						containerClassName=""
						suggestionClassName="flex flex-col gap-y-2 px-4 pt-1 pb-1 w-full hover:bg-gray-100 text-left transition-colors duration-150"
						currentSuggestionClassName="bg-red-900"
						highlightClassName="bg-green"
					/>
				)}
				name="address"
			/>
		</div>
	)
}
