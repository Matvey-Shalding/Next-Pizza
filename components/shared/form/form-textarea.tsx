// components/form/form-textarea.tsx
import { Textarea } from '@/components/ui'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from './error-message'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
	label: string
	name: string
}

export const FormTextArea: React.FC<Props> = ({
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
				<Textarea
					id={name}
					label={label}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					placeholder=" " // enables placeholder-shown for label color state
					aria-invalid={!!errorMessage || undefined}
					className={cn(className)}
					{...props}
				/>

				{value && (
					<X
						onClick={() => setValue(name, '')}
						className="absolute size-4 stroke-gray-400 right-2 top-2 cursor-pointer"
					/>
				)}
			</div>

			<ErrorMessage text={errorMessage} />
		</div>
	)
}
