import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar
} from '@/components/shared'
import { PaymentToastHandler } from '@/components/shared/payment-toast-handler'
import { Stories } from '@/components/shared/stories'
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
			<PaymentToastHandler />
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
				<Suspense fallback={<div className="w-60">Loading filters...</div>}>
					<Filters />
				</Suspense>
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
