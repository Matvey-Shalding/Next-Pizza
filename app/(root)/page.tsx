import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';
import prisma from '@/lib/prisma';
import { Suspense } from 'react';

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					items: true,
				},
			},
		},
	});

	return (
		<>
			<Container className='mt-8'>
				<Title text='All pizzas' size='lg' className='font-extrabold' />
			</Container>
			<TopBar categories={categories} />

			<Container className='pb-15 mt-10 flex gap-x-15'>
				<Suspense>
					<Filters />
				</Suspense>
				<div className='flex flex-col gap-y-16 basis-full'>
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
	);
}
