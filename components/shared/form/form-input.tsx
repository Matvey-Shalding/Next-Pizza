import { Input } from '@/components/ui'
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
	}, [errors])

	return (
		<div className="flex flex-col gap-y-2">
			<span className="text-black font-bold text-sm">{label}</span>
			<div className="relative">
				<Input
					{...register(name)}
					{...props}
				/>
				{value && (
					<X
						onClick={() => setValue(name, '')}
						className="absolute size-4 stroke-gray-400 right-2 top-1/2 -translate-y-1/2"
					/>
				)}
			</div>
			<ErrorMessage text={errorMessage} />
		</div>
	)
}
