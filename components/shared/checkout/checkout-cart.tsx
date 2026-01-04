'use client'

import { Skeleton } from '@/components/ui'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { getItemDetails } from '@/lib/get-item-details'
import { CartItemWithIngredients } from '@/store/cart'
import { AnimatePresence, motion } from 'framer-motion'
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
		<CheckoutBlock
			className="flex flex-col gap-y-6"
			title="1.Cart"
		>
			{loading ? (
				new Array(4).fill(0).map((_, i) => (
					<Skeleton
						key={i}
						className="h-[85px] w-full"
					/>
				))
			) : (
				<AnimatePresence mode="popLayout">
					{items.map(item => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10, scale: 0.95 }}
							transition={{ duration: 0.25 }}
							layout
						>
							<CheckoutItem
								disabled={item.disabled}
								onRemoveItem={() => removeCartItem(item.id)}
								onClickCountButton={(type: 'plus' | 'minus') =>
									onClickCountButton(item.id, type, item.quantity)
								}
								quantity={item.quantity}
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
						</motion.div>
					))}
				</AnimatePresence>
			)}
		</CheckoutBlock>
	)
}
