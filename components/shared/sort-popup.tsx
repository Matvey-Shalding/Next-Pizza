import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

export function SortPopup({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
				className
			)}
		>
			<ArrowUpDown size={16} />
			<span className='font-bold'>Sorting:</span>
			<span className='text-primary font-bold'>Popular</span>
		</div>
	);
}
