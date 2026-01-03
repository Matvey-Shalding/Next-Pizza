import { cn } from '@/lib/utils'
import { Ingredient } from '@/prisma/generated/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Title } from '.'
import { Button } from '../ui'
interface Props {
	className?: string
	id: number
	price: number
	imageUrl: string
	name: string
	ingredients: Ingredient[]
}
export const ProductCard: React.FC<Props> = ({
	className,
	id,
	name,
	imageUrl,
	ingredients,
	price
}) => {



	return (
		<div className={cn(className, 'flex flex-col gap-y-4')}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-70">
					<img
						src={imageUrl}
						width={285}
						alt="Logo"
					/>
				</div>
			</Link>
			<div className="flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-2">
					<Title
						text={name}
						size="sm"
						className="font-bold"
					/>
					<p className="text-sm text-gray-400">
						{ingredients
							.map((ingredient, i) =>
								i !== 0 ? ingredient.name.toLowerCase() : ingredient.name
							)
							.join(', ')}
					</p>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-[20px]">{price} $</span>
					<Link href={`/product/${id}`}>
						<Button
							variant="secondary"
							className="text-base font-bold"
						>
							<Plus className="size-5 mr-1" />
							<span>Add</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
