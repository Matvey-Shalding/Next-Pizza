'use client'

import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import * as React from 'react'

/**
 * Root dialog component. Controls open state.
 */
function Dialog({
	open,
	onOpenChange,
	...props
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>) {
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onOpenChange(false)
			}
		}
		if (open) {
			window.addEventListener('keydown', handleKeyDown)
		}
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [open, onOpenChange])

	if (!open) return null
	return (
		<div
			data-slot="dialog"
			{...props}
		/>
	)
}

function DialogTrigger({
	onClick,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			data-slot="dialog-trigger"
			onClick={onClick}
			{...props}
		/>
	)
}

function DialogPortal({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}

function DialogClose({
	onClick,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			data-slot="dialog-close"
			onClick={onClick}
			{...props}
		/>
	)
}

function DialogOverlay({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="dialog-overlay"
			className={cn('fixed inset-0 z-50 bg-black/50', className)}
			{...props}
		/>
	)
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	onClose,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	showCloseButton?: boolean
	onClose?: () => void
}) {
	return (
		<div
			data-slot="dialog-content"
			className={cn(
				'bg-background fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg',
				className
			)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<button
					data-slot="dialog-close"
					className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
					onClick={onClose}
				>
					<XIcon />
					<span className="sr-only">Close</span>
				</button>
			)}
		</div>
	)
}

function DialogHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
			{...props}
		/>
	)
}

function DialogFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
				className
			)}
			{...props}
		/>
	)
}

function DialogTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			data-slot="dialog-title"
			className={cn('text-lg font-semibold leading-none', className)}
			{...props}
		/>
	)
}

function DialogDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			data-slot="dialog-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger
}
