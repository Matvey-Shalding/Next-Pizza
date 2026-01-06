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
			if (e.key === 'Escape') {
				router.back()
			}
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
					'w-full max-w-[1000px] max-h-145 h-145 overflow-hidden p-0! rounded-4xl shadow-popup bg-white relative',
					className
				)}
				// prevent clicks inside modal from closing it
				onClick={e => e.stopPropagation()}
			>
				<ProductForm
					product={product}
					inline={false}
				/>

				{/* Custom close button */}
				<button
					onClick={() => router.back()}
					className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity"
				>
					<X
						width={30}
						height={30}
						stroke="#99a1af"
						className="stroke-gray-400"
					/>
					<span className="sr-only">Close</span>
				</button>
			</div>
		</div>
	)
}
