import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

// Restricts the main content page width to 1280px

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return <div className={cn('mx-auto max-w-320', className)}>{children}</div>;
};
