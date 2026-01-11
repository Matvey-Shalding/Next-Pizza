'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
	className?: string
	children: React.ReactNode
}

export const Dropdown: React.FC<Props> = ({ className, children }) => {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	// Close on outside click
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open])

	useEffect(() => {
		function handleScroll() {
			setOpen(false)
		}
		if (open) {
			window.addEventListener('scroll', handleScroll)
		}
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [open])

	return (
		<div
			className={cn('relative', className)}
			ref={ref}
		>
			{/* Trigger button */}
			<button
				onClick={() => setOpen(prev => !prev)}
				aria-expanded={open}
				aria-haspopup="true"
				className="p-2"
			>
				<Menu className="text-black size-6" />
			</button>
			{/* Dropdown menu overlay */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2 }}
						className="fixed top-16 right-4 z-50 bg-white shadow-lg rounded-lg p-4"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
