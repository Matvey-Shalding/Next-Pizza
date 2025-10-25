import { cn } from '@/lib/utils';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';

export function TopBar({ className }: { className?: string }) {
  return (
		<div className={cn(className, 'sticky top-0 bg-white py-5 z-10 shadow-lg shadow-black/5')}>
			<Container className='flex items-center justify-between'>
				<Categories classname='' />
				<SortPopup />
			</Container>
		</div>
	);
}
