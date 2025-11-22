import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: any }) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(params.id),
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
