import { cn } from '@/lib/utils'
import * as React from 'react'

const inputBaseStyles = cn(
	'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
	'dark:bg-input/30 border-input h-11 w-full min-w-0 rounded-[10px] border bg-transparent px-4 pb-3.5',
	'text-base/11 leading-none flex items-center',
	'shadow-xs outline-none',
	'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
	'transition-colors duration-300 ease-in-out',
	'focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-1 focus-visible:shadow-[0_0_0_1px_hsl(var(--ring)/0.1)]',
	'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
)

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type = 'text', ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				data-slot="input"
				className={cn(inputBaseStyles, className)}
				{...props}
			/>
		)
	}
)

Input.displayName = 'Input'

export { Input }
