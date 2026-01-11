'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { CartButton, Container, ProfileButton, SearchInput } from '..'
import { Dropdown } from './dropdown'

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
		<header
			className={cn(
				className,
				'border-b small-phone:min-h-14.5 phone:min-h-18 px-4 tablet:min-h-25 small-laptop:min-h-30 flex'
			)}
		>
			<Container className="flex justify-between items-center gap-x-10 basis-full">
				<div className="flex items-center gap-2 phone:gap-4 basis-auto shrink-0">
					<Image
						src="/logo.png"
						alt="Logo"
						width={35}
						height={35}
						className="small-phone:w-[25px] small-phone:h-[25px] tablet:w-[30px] tablet:h-[30px] small-laptop:w-[35px] small-laptop:h-[35px]"
					/>

					<div className="flex flex-col">
						<h1 className="uppercase font-black small-phone:text-lg tablet:text-xl small-laptop:text-2xl">
							Next pizza
						</h1>
						<p className="text-sm max-phone:hidden text-gray-400 leading-3">
							It can’t get any more delicious.
						</p>
					</div>
				</div>

				{/* DESKTOP SEARCH (≥1024px) */}
				{hasSearch && (
					<div className="hidden small-laptop:flex basis-full items-center justify-center">
						<SearchInput />
					</div>
				)}

				{/* DESKTOP ACTIONS (≥1024px) */}
				<div className="hidden small-laptop:flex items-center transition-all duration-300 gap-x-3">
					<ProfileButton />
					{hasCartButton && <CartButton />}
				</div>

				{/* TABLET ACTIONS (768px–1023px) */}
				<div className="hidden tablet:flex small-laptop:hidden items-center gap-x-3">
					<ProfileButton />
					{hasSearch && <SearchInput />}
					{hasCartButton && <CartButton />}
				</div>

				{/* MOBILE DROPDOWN (<768px) */}
				<div className="tablet:hidden">
					<Dropdown>
						<div className="flex flex-col gap-y-2">
							<ProfileButton />
							{hasSearch && <SearchInput />}
							{hasCartButton && <CartButton />}
						</div>
					</Dropdown>
				</div>
			</Container>
		</header>
	)
}
