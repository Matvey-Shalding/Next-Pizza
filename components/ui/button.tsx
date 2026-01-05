'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md active:translate-y-[1px]',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] hover:shadow-md active:translate-y-[1px]',
				outline:
					'border border-primary text-primary bg-transparent hover:bg-secondary hover:scale-[1.02] active:translate-y-[1px]',
				secondary:
					'bg-secondary text-primary hover:bg-secondary/70 hover:scale-[1.02] active:translate-y-[1px]',
				ghost:
					'hover:bg-secondary hover:text-secondary-foreground hover:scale-[1.02] active:translate-y-[1px]',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			children,
			disabled,
			loading,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				disabled={disabled || loading}
				className={cn(
					buttonVariants({ variant, size, className }),
					loading && 'relative'
				)}
				ref={ref}
				{...props}
			>
				{!loading ? (
					children
				) : (
					<Loader className="w-5 h-5 animate-spin text-current" />
				)}
			</Comp>
		)
	}
)

Button.displayName = 'Button'

export { Button, buttonVariants }
