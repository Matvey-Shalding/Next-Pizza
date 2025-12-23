import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function Page({ params}: { params: { id: string } }) {

	const {id} = await params

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}
