// form-input.tsx
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from './error-message'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	label: string
	name: string
}

export const FormInput: React.FC<Props> = ({
	className,
	label,
	name,
	...props
}) => {
	const {
		register,
		formState: { errors },
		setValue,
		watch
	} = useFormContext()

	const value = watch(name)

	const errorMessage = useMemo(() => {
		return errors[name]?.message as string | undefined
	}, [errors, name])

	const { onChange, onBlur, ref } = register(name)

	return (
		<div className="flex flex-col gap-y-2">
			<div className="relative">
				<FloatingLabelInput
					id={name}
					label={label}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					placeholder=" "
					aria-invalid={!!errorMessage || undefined}
					className={cn('pt-4', className)}
					{...props}
				/>

				<X
					onClick={() => setValue(name, '')}
					className={cn(
						'absolute size-5 stroke-gray-400 right-3 transition-opacity duration-300 top-1/2 -translate-y-1/2 cursor-pointer',
						{
							'opacity-0 pointer-events-none': !value,
							'opacity-100 pointer-events-auto': value
						}
					)}
				/>
			</div>

			<ErrorMessage text={errorMessage} />
		</div>
	)
}
