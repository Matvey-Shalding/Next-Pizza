import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { Categories } from './categories';
import { Container } from './container';
import { SortPopup } from './sort-popup';

export function TopBar({ className, categories }: { className?: string; categories: Category[] }) {
	return (
		<div className={cn(className, 'sticky top-0 bg-white py-5 z-10 shadow-lg shadow-black/5')}>
			<Container className='flex items-center justify-between'>
				<Categories categories={categories} />
				<SortPopup />
			</Container>
		</div>
	);
}
