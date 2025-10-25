import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className='mt-8'>
				<Title text='All pizzas' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />

			<Container className='pb-15 mt-10 flex gap-x-15'>
				<Filters />
				<div className='flex flex-col gap-y-16 basis-full'>
					<ProductsGroupList
						title='Pizzas'
						products={[
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
						]}
						categoryId={1}
					/>
					<ProductsGroupList
						title='Breakfast'
						products={[
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
							{
								id: 1,
								name: 'Pizza barbecue',
								imageUrl:
									'https://media.dodostatic.net/image/r:584x584/11ef90a99cf88e1b958e08b52ab6ecef.avif',
								price: 550,
								items: [{ price: 550 }],
							},
						]}
						categoryId={2}
					/>
				</div>
			</Container>
		</>
	);
}
