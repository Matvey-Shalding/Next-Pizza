// hooks/use-sliding-marker.ts

import { useEffect, useState, RefObject } from 'react';

/**
 * Calculates slider position under selected toggle item.
 */
export const useSlidingMarker = ({
	containerRef,
	selectedValue,
}: {
	containerRef: RefObject<HTMLElement | null>;
	selectedValue: string;
}): React.CSSProperties => {
	const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({
		left: 0,
		width: 0,
	});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const selectedItem = container.querySelector<HTMLElement>(`[data-value="${selectedValue}"]`);
		if (!selectedItem) return;

		const containerRect = container.getBoundingClientRect();
		const itemRect = selectedItem.getBoundingClientRect();

		setSliderStyle({
			left: itemRect.left - containerRect.left,
			width: itemRect.width,
			transition: 'left 0.3s ease, width 0.3s ease',
		});
	}, [selectedValue, containerRef]);

	return sliderStyle;
};
