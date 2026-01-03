'use client'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { getItemDetails } from '@/lib/get-item-details'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { CartDrawerItem } from './cart-drawer-item'

interface Props {
	items: any[]
	onClickCountButton: (
		id: number,
		type: 'plus' | 'minus',
		quantity: number
	) => void
	removeCartItem: (id: number) => Promise<void>
}

export const CartDrawerList: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem
}) => (
	<div className="basis-full flex flex-col gap-y-2.5 overflow-y-auto px-5">
		<AnimatePresence mode="popLayout">
			{items.map(item => (
				<motion.div
					key={item.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					transition={{ duration: 0.25 }}
					layout
				>
					<CartDrawerItem
						disabled={item.disabled}
						onRemoveItem={() => removeCartItem(item.id)}
						onClickCountButton={type =>
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
	</div>
)
