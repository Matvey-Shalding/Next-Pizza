'use client'

import { useSlidingMarker } from '@/hooks/use-sliding-marker'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'

export interface Toggle {
	name: string
	value: string // DOM requires string
	disabled?: boolean
}

interface Props {
	onClick: (value: string) => void
	selectedValue: string
	items: Toggle[]
	className?: string
}

export const Toggles: React.FC<Props> = ({
	className,
	items,
	onClick,
	selectedValue
}) => {
	const containerRef = useRef<HTMLDivElement>(null)

	const sliderStyle = useSlidingMarker({
		containerRef,
		selectedValue
	})

	return (
		<div
			ref={containerRef}
			className={cn(
				className,
				'relative flex max-w-105 h-9 rounded-4xl bg-[#ECECEC] overflow-hidden'
			)}
		>
			<div
				className="absolute top-1/2 h-9 -translate-y-1/2 left-1 bottom-0 bg-white shadow rounded-3xl z-0 transition-all duration-300"
				style={sliderStyle}
			/>
			{items.map(item => (
				<div
					data-value={item.value}
					onClick={() => !item.disabled && onClick(item.value)}
					key={item.value}
					className={cn(
						'relative z-10 flex items-center justify-center cursor-pointer px-5 flex-1 text-sm font-medium transition-all duration-200',
						'hover:text-primary hover:rounded-4xl hover:bg-white/40 active:scale-95',
						{
							'text-gray-900': item.value === selectedValue,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled
						}
					)}
				>
					{item.name}
				</div>
			))}
		</div>
	)
}
