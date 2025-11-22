'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface Toggle {
	name: string;
	value: string;
	disabled?: boolean;
}

interface Props {
	onClick: (value: Toggle['value']) => void;
	selectedValue: Toggle['value'];
	items: Toggle[];
	className?: string;
}

export const Toggles: React.FC<Props> = ({ className, items, onClick, selectedValue }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({ left: 0, width: 0 });

	useEffect(() => {
		if (!containerRef.current) return;

		const selectedItem = containerRef.current.querySelector(`[data-value="${selectedValue}"]`);
		if (!selectedItem) return;

		const containerRect = containerRef.current.getBoundingClientRect();
		const itemRect = selectedItem.getBoundingClientRect();

		setSliderStyle({
			left: itemRect.left - containerRect.left,
			width: itemRect.width,
			transition: 'left 0.3s ease, width 0.3s ease',
		});
	}, [selectedValue]);

	return (
		<div
			ref={containerRef}
			className={cn(className, 'relative flex h-9 rounded-4xl bg-[#ECECEC] overflow-hidden')}
		>
			{/* Sliding background */}
			<div className='absolute top-0 bottom-0 bg-white shadow rounded-3xl z-0' style={sliderStyle} />

			{/* Toggle items */}
			{items.map(item => (
				<div
					data-value={item.value}
					onClick={() => !item.disabled && onClick(item.value)}
					key={item.value}
					className={cn(
						'relative z-10 flex items-center justify-center cursor-pointer px-5 flex-1 text-sm font-medium transition-colors duration-300',
						{
							'text-gray-900': item.value === selectedValue,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};
