import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import React, { useMemo } from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage } from './error-message'

interface Props {
	className?: string
}

export const AddressInput: React.FC<Props> = ({ className }) => {
	const {
		control,
		formState: { errors }
	} = useFormContext()

	const errorMessage = useMemo(() => {
		return errors.address?.message as string | undefined
	}, [errors])

	return (
		<div className="flex flex-col gap-y-2">
			<Controller
				name="address"
				control={control}
				render={({ field, fieldState }) => (
					<>
						<AddressSuggestions
							token="bb8187ede29c96c8396fdbc73ced2f71284f2b5a"
							value={field.value || ''}
							onChange={suggestion => {
								field.onChange(suggestion?.value ?? '')
							}}
							customInput={FloatingLabelInput}
							inputProps={{
								id: 'address',
								label: 'Shipping address',
								placeholder: ' ',
								className,
								'aria-invalid': fieldState.invalid || undefined
							}}
							suggestionsClassName='rounded-md shadow-md overflow-x-hidden flex flex-col'
							suggestionClassName="py-2 px-4 w-full hover:bg-gray-200 text-left transition-colors duration-150"
							currentSuggestionClassName="bg-gray-50"
							highlightClassName="bg-green-100"
						/>

						<ErrorMessage text={errorMessage} />
					</>
				)}
			/>
		</div>
	)
}
