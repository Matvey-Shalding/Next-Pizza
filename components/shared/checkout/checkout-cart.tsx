'use client'

import { Skeleton } from '@/components/ui'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { getItemDetails } from '@/lib/get-item-details'
import { CartItemWithIngredients } from '@/store/cart'
import React from 'react'
import { CheckoutBlock, CheckoutItem } from '.'
interface Props {
	className?: string
	items: CartItemWithIngredients[]
	onClickCountButton: (
		id: number,
		type: 'plus' | 'minus',
		quantity: number
	) => void
	removeCartItem: (id: number) => Promise<void>
	totalAmount: number
	loading?: boolean
}
export const Cart: React.FC<Props> = ({
	className,
	items,
	removeCartItem,
	onClickCountButton,
	loading
}) => {
	return (
		<CheckoutBlock title="1.Cart">
			<div className="flex flex-col gap-y-6">
				{loading
					? new Array(4).fill(0).map((_, i) => (
							<Skeleton
								key={i}
								className="h-[85px] w-full"
							/>
					  ))
					: items.map(item => (
							<CheckoutItem
								disabled={item.disabled}
								onRemoveItem={() => removeCartItem(item.id)}
								onClickCountButton={(type: 'plus' | 'minus') =>
									onClickCountButton(item.id, type, item.quantity)
								}
								quantity={item.quantity}
								key={item.id}
								name={item.name}
								description={
									item.pizzaType && item.pizzaSize
										? getItemDetails(
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize,
												item.ingredients
										  )
										: ''
								}
								imageUrl={item.imageUrl}
								price={item.price}
							/>
					  ))}
			</div>
		</CheckoutBlock>
	)
}
