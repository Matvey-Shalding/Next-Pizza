'use client';

import { categories } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { useCallback, useEffect, useRef, useState } from 'react';

export function Categories({ classname }: { classname?: string }) {
	const activeId = useCategoryStore(state => state.activeId);
	const setActiveId = useCategoryStore(state => state.setActiveId); // optional if you have this
	const containerRef = useRef<HTMLDivElement>(null);
	const [markerStyle, setMarkerStyle] = useState<React.CSSProperties>({ left: 0, width: 0 });

	const measure = useCallback(() => {
		if (!containerRef.current) return;
		const activeBtn = containerRef.current.querySelector<HTMLButtonElement>(`[data-id="${activeId}"] button`);
		if (!activeBtn) return;

		// Left relative to the container
		const containerRect = containerRef.current.getBoundingClientRect();
		const btnRect = activeBtn.getBoundingClientRect();

		const left = btnRect.left - containerRect.left;
		const width = btnRect.width;

		setMarkerStyle({ left, width });
	}, [containerRef, activeId]);

	useEffect(() => {
		measure();
	}, [activeId]);

	useEffect(() => {
		const handleResize = () => measure();
		window.addEventListener('resize', handleResize);
		// Measure once after initial render (fonts/images can shift layout)
		const id = window.setTimeout(measure, 0);
		return () => {
			window.removeEventListener('resize', handleResize);
			window.clearTimeout(id);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn(classname, 'relative inline-flex gap-x-1 p-1 bg-gray-50 rounded-2xl')}
		>
			{/* Sliding marker */}
			<span
				className='absolute top-1 bottom-1 rounded-2xl bg-white shadow-md shadow-gray-200 transition-[left,width] duration-300 ease-in-out'
				style={markerStyle}
			/>

			{categories.map(({ name, id }) => (
				<a key={id} data-id={id} href={`/#${name}`} className='relative z-10'>
					<button
						className={cn(
							'flex items-center font-bold h-11 rounded-2xl px-5 transition-colors duration-300',
							activeId === id ? 'text-primary' : 'text-gray-700'
						)}
					>
						{name}
					</button>
				</a>
			))}
		</div>
	);
}
