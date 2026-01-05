'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Container, SearchInput } from '.'
import { CartButton } from './cart-button'
import { ProfileButton } from './profile-button'

export function Header({
	className,
	hasCartButton = true,
	hasSearch = true
}: {
	className?: string
	hasSearch?: boolean
	hasCartButton?: boolean
}) {
	return (
		<header className={cn(className, 'border-b min-h-30 flex')}>
			<Container className="flex justify-between items-center gap-x-10 basis-full">
				<div className="flex items-center gap-4 basis-auto shrink-0">
					<Image
						src="/logo.png"
						alt="Logo"
						width={35}
						height={35}
					/>
					<div>
						<h1 className="text-2xl uppercase font-black">Next pizza</h1>
						<p className="text-sm text-gray-400 leading-3">
							It can’t get any more delicious.
						</p>
					</div>
				</div>
				{hasSearch && (
					<SearchInput className="basis-full flex items-center justify-center" />
				)}
				<div className="flex items-center gap-x-3">
					<ProfileButton />
					{hasCartButton && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
