'use client'

import { ProductWithIngredients } from '@/@types'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ProductForm } from '..'

interface Props {
	className?: string
	product: ProductWithIngredients
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter()
	const open = Boolean(product)

	// Close on Escape + disable body scroll
	useEffect(() => {
		if (!open) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') router.back()
		}

		window.addEventListener('keydown', handleKeyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [open, router])

	if (!open) return null

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-50 flex items-center justify-center"
		>
			{/* Overlay */}
			<div
				className="fixed inset-0 bg-black/50"
				onClick={() => router.back()}
			/>

			{/* Content */}
			<div
				className={cn(
					// Desktop (≥640px)
					'max-laptop:max-w-[640px] laptop:w-250 bg-white rounded-[30px] shadow-lg max-h-145 overflow-y-auto overflow-x-hidden',

					// Mobile (<640px)
					'max-xs:w-full max-xs:h-full max-xs:max-h-none max-xs:overflow-y-auto max-xs:rounded-none max-xs:shadow-none max-xs:bg-transparent',

					'relative',
					className
				)}
				onClick={e => e.stopPropagation()}
			>
				<ProductForm
					product={product}
					inline={false}
				/>

				{/* Close button */}
				<button
					onClick={() => router.back()}
					className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity"
				>
					<X
						width={30}
						height={30}
						className="stroke-gray-400"
					/>
					<span className="sr-only">Close</span>
				</button>
			</div>
		</div>
	)
}
