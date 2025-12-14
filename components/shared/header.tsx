import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import { CartButton, Container, SearchInput } from '.';
import { Button } from '../ui';

export function Header({ className }: { className?: string }) {
	return (
		<header className={cn(className, 'border border-b min-h-30 flex')}>
			<Container className='flex justify-between items-center gap-x-10 basis-full'>
				<div className='flex items-center gap-4 basis-auto shrink-0'>
					<Image src='/logo.png' alt='Logo' width={35} height={35} />
					<div>
						<h1 className='text-2xl uppercase font-black'>Next pizza</h1>
						<p className='text-sm text-gray-400 leading-3'>It can’t get any more delicious.</p>
					</div>
				</div>
				<SearchInput className='basis-full flex items-center justify-center' />
				<div className='flex items-center gap-x-3'>
					<Button variant='outline' className='flex items-center gap-x-1'>
						<User size={16} />
						Log in
					</Button>
				</div>
				<CartButton />
			</Container>
		</header>
	);
}
