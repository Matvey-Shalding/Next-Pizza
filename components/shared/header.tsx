import { cn } from '@/lib/utils';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui';
import { Container } from './container';
import { SearchInput } from './search-input';

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
				<SearchInput className='basis-full flex items-center justify-center'/>
				<div className='flex items-center gap-x-3'>
					<Button variant='outline' className='flex items-center gap-x-1'>
						<User size={16} />
						Log in
					</Button>
					<div className=''>
						<Button className='group relative flex items-center gap-x-3'>
							<span className='font-bold'>520$</span>
							<span className='h-full w-[1px] bg-white/30'></span>
							<div className='relative'>
								<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
									<ShoppingCart className='size-4 stroke-2' />
									<span className='font-bold'>3</span>
								</div>
								<ArrowRight
									className={cn(
										'opacity-0 w-5 h-5 left-0 group-hover:left-2 top-1/2',
										' -translate-y-1/2 absolute transition-all duration-300 group-hover:opacity-100'
									)}
								/>
							</div>
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
}
