'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

export interface CheckboxProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'checked' | 'onChange'
	> {
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{ className, checked = false, onCheckedChange, disabled, ...props },
		ref
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onCheckedChange?.(e.target.checked)
		}

		return (
			<span
				className={cn(
					'inline-flex items-center justify-center',
					disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
					className
				)}
			>
				<input
					ref={ref}
					type="checkbox"
					className="sr-only peer"
					checked={checked}
					disabled={disabled}
					onChange={handleChange}
					{...props}
				/>

				<span
					aria-hidden="true"
					className={cn(
						'grid size-6 place-items-center rounded-[8px] border transition-colors',
						'border-gray-300 bg-gray-100',
						'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
						checked && 'bg-primary border-primary text-primary-foreground'
					)}
				>
					<AnimatePresence>
						{checked && (
							<motion.div
								key="check"
								initial={{ scale: 0.6, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.6, opacity: 0 }}
								transition={{ type: 'spring', stiffness: 340, damping: 22 }}
							>
								<CheckIcon className="size-4" />
							</motion.div>
						)}
					</AnimatePresence>
				</span>
			</span>
		)
	}
)


