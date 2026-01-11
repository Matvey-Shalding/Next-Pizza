'use client'

import {
	Container,
	Filters,
	ProductsGroupList,
	QueryToastHandler,
	Stories,
	Title,
	TopBar
} from '@/components/shared'
import { Suspense } from 'react'
import { useMedia } from 'react-use'

export function HomeClient({ categories }: { categories: any[] }) {
	const isTablet = useMedia('(max-width: 1024px)', false)

	return (
		<>
			<QueryToastHandler />
			<Container className="small-laptop:mt-8 phone:mt-3">
				<Stories />
				<Title
					text="All pizzas"
					size="lg"
					className="font-extrabold"
				/>
			</Container>

			<TopBar categories={categories}>{isTablet && <Filters />}</TopBar>

			<Container className="pb-25 mt-10 flex gap-x-15">
				{!isTablet && (
					<Suspense fallback={<div className="w-60">Loading filters...</div>}>
						<Filters />
					</Suspense>
				)}
				<div className="flex flex-col gap-y-16 basis-full">
					{categories.map(category => (
						<Suspense
							key={category.id}
							fallback={<div>Loading {category.name}...</div>}
						>
							<ProductsGroupList
								title={category.name}
								categoryId={category.id}
								products={category.products}
							/>
						</Suspense>
					))}
				</div>
			</Container>
		</>
	)
}
