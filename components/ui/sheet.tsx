'use client';

import { cn } from '@/lib/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import * as React from 'react';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
	side?: 'top' | 'right' | 'bottom' | 'left';
}

const SheetContentWithMotion = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => {
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		// This helps trigger exit animations
		setIsVisible(true);
		return () => setIsVisible(false);
	}, []);

	const variants = {
		initial: {
			x: side === 'right' ? '100%' : side === 'left' ? '-100%' : 0,
			y: side === 'top' ? '-100%' : side === 'bottom' ? '100%' : 0,
		},
		animate: { x: 0, y: 0 },
		exit: {
			x: side === 'right' ? '100%' : side === 'left' ? '-100%' : 0,
			y: side === 'top' ? '-100%' : side === 'bottom' ? '100%' : 0,
		},
	};

	return (
		<SheetPortal>
			<SheetPrimitive.Overlay asChild>
				<motion.div
					className='fixed inset-0 z-50 bg-black/80'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			</SheetPrimitive.Overlay>
			<SheetPrimitive.Content ref={ref} asChild {...props}>
				<motion.div
					className={cn(
						'fixed z-50 gap-4 bg-background p-6 shadow-lg',
						side === 'right' && 'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm',
						side === 'left' && 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
						side === 'top' && 'inset-x-0 top-0',
						side === 'bottom' && 'inset-x-0 bottom-0',
						className
					)}
					variants={variants}
					initial='initial'
					animate={isVisible ? 'animate' : 'initial'}
					exit='exit'
					transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
				>
					<AnimatePresence>{children}</AnimatePresence>
					<SheetPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
						<X className='h-4 w-4' />
						<span className='sr-only'>Close</span>
					</SheetPrimitive.Close>
				</motion.div>
			</SheetPrimitive.Content>
		</SheetPortal>
	);
});
SheetContentWithMotion.displayName = 'SheetContent';

// Re-export with proper name
const SheetContent = SheetContentWithMotion;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
		{...props}
	/>
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetPortal,
	SheetTitle,
	SheetTrigger,
};
