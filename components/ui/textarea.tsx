import { cn } from '@/lib/utils'
import * as React from 'react'

interface FloatingLabelTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
	id?: string
}

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	FloatingLabelTextareaProps
>(({ className, label, id, ...props }, ref) => {
	return (
		<div className="relative w-full">
			<textarea
				ref={ref}
				id={id}
				placeholder=" "
				data-slot="textarea"
				className={cn(
					'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
					'dark:bg-input/30 border-input min-h-16 w-full min-w-0 rounded-[10px] border bg-transparent',
					'px-4 pb-3.5 pt-4 text-base/11 leading-none',
					'shadow-xs outline-none',
					'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
					'transition-colors duration-300 ease-in-out',
					'focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-1',
					'focus-visible:shadow-[0_0_0_1px_hsl(var(--ring)/0.1)]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					'peer',
					className
				)}
				{...props}
			/>

			<label
				htmlFor={id}
				className={cn(
					'pointer-events-none absolute left-3 top-2 translate-y-0 text-muted-foreground transition-all duration-200 ease-out',
					'px-1.5 bg-white dark:bg-background/80',
					'peer-placeholder-shown:top-2 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium',
					'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-primary',
					'peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-xs'
				)}
			>
				{label}
			</label>
		</div>
	)
})

Textarea.displayName = 'Textarea'

export { Textarea }