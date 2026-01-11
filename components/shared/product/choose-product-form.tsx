import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ProductItem } from '@prisma/client'
import React from 'react'
import { Title } from '..'
interface Props {
	className?: string
	name: string
	imageUrl: string
	items: ProductItem[]
	onSubmit: (productId: number) => void
	loading?: boolean
}
export const ChooseProductForm: React.FC<Props> = ({
	className,
	imageUrl,
	loading,
	name,
	items,
	onSubmit
}) => {
	return (
		<div className={cn(className, 'flex gap-x-1 min-h-full min-w-full')}>
			<div className="bg-white max-xl:hidden min-h-full basis-1/2 grid place-content-center">
				<img src={imageUrl} />
			</div>
			<div className="xl-max:basis-1/2 basis-full min-h-full flex flex-col justify-between  bg-[#F4F1EE] p-10">
				<Title
					size="sm"
					className="font-bold"
					text={name}
				/>
				<Button
					loading={loading}
					onClick={() => onSubmit(items[0].id)}
				>
					Add to cart for ${items[0].price}$
				</Button>
			</div>
		</div>
	)
}
