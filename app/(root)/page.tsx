import {
	Container,
	Filters,
	ProductsGroupList,
	Stories,
	Title,
	TopBar
} from '@/components/shared'
import { getCategories, SearchParams } from '@/lib/get-categories'
import { Suspense } from 'react'

export default async function Home({
	searchParams
}: {
	searchParams: Promise<SearchParams>
}) {
	const params = await searchParams

	const categories = await getCategories(params)

	return (
		<>
			<Container className="mt-8">
				<Stories />
				<Title
					text="All pizzas"
					size="lg"
					className="font-extrabold"
				/>
			</Container>
			<TopBar categories={categories} />

			<Container className="pb-25 mt-10 flex gap-x-15">
				<Suspense>
					<Filters/>
				</Suspense>
				<div className="flex flex-col gap-y-16 basis-full">
					{categories.map(category => (
						<ProductsGroupList
							title={category.name}
							categoryId={category.id}
							key={category.id}
							products={category.products}
						/>
					))}
				</div>
			</Container>
		</>
	)
}
