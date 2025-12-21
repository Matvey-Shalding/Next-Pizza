'use client';

import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
	size?: TitleSize;
	className?: string;
	text: string;
}

const sizeClasses: Record<TitleSize, string> = {
	xs: 'text-base',
	sm: 'text-[22px]',
	md: 'text-[26px]',
	lg: 'text-[32px]',
	xl: 'text-[40px]',
	'2xl': 'text-[48px]',
};

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
	return <span className={clsx(sizeClasses[size], className)}>{text}</span>;
};
