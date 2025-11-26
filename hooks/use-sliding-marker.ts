// hooks/use-sliding-marker.ts

import { useEffect, useState, RefObject } from 'react';

/**
 * A custom hook that calculates the position and width of a sliding marker
 * (e.g., a visual indicator) under the currently selected item in a horizontal toggle group.
 *
 * It observes the selected value and a container ref, then measures the DOM element
 * that matches `[data-value="${selectedValue}"]` to compute the correct `left` and `width`
 * for a highlight/slider element.
 *
 * @param {Object} params - Configuration object.
 * @param {React.RefObject<HTMLElement | null>} params.containerRef - Ref to the parent container that holds the toggle items.
 *        Should be attached to a DOM element that contains children with `data-value` attributes.
 * @param {string} params.selectedValue - The `value` of the currently selected toggle item (must match `data-value` on the item).
 *
 * @returns {React.CSSProperties} An object with `left`, `width`, and optional `transition` styles
 *          to apply to an absolutely positioned sliding marker element.
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const sliderStyle = useSlidingMarker({ containerRef, selectedValue });
 * // <div ref={containerRef}>...<div data-value="small">Small</div>...</div>
 * // <div className="slider" style={sliderStyle} />
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
