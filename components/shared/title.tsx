import clsx from 'clsx';
import React, { useMemo } from 'react';

// The component accepts text size and generates the corresponding html title tag

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
	size?: TitleSize;
	className?: string;
	text: string;
}

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
	const mapTagBySize = useMemo(() => ({
		xs: 'h5',
		sm: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
		'2xl': 'h1',
	} as const),[])

	const mapClassNameBySize = useMemo(() => ({
		xs: 'text-base',
		sm: 'text-[22px]',
		md: 'text-[26px]',
		lg: 'text-[32px]',
		xl: 'text-[40px]',
		'2xl': 'text-[48px]',
	} as const),[])

	return React.createElement(
		mapTagBySize[size],
		{ className: clsx(mapClassNameBySize[size], className) },
		text
	);
};
