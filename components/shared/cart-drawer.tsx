'use client'

import { PizzaSize, PizzaType } from '@/constants/pizza'
import { useCart } from '@/hooks'
import { getItemDetails } from '@/lib/get-item-details'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import React, { ReactNode } from 'react'
import { Button } from '../ui'
import { CartDrawerItem } from './cart-drawer-item'
import { useRouter } from 'next/navigation'

interface Props {
	className?: string
	children: ReactNode
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartDrawer: React.FC<Props> = ({ children, open, setOpen }) => {
	const {
		items,
		onClickCountButton,
		removeCartItem,
		updateItemQuantity,
		totalAmount
	} = useCart()

	const router = useRouter()

	return (
		<>
			{children}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						onClick={e => {
							if (e.target === e.currentTarget) setOpen(false)
						}}
						className="fixed inset-0 z-50 bg-black/50 flex justify-end pointer-events-auto"
					>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '400px' }}
							exit={{ width: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className={cn({
								'h-screen bg-[#F4F1EE] flex flex-col gap-y-5 pt-5':
									items.length > 0,
								'bg-white grid place-content-center': items.length === 0
							})}
						>
							{items.length > 0 ? (
								<>
									<div className="text-lg text-black flex px-5 items-center justify-between w-full">
										<span>
											<span className="font-bold">
												{items.length} item{items.length !== 1 ? 's' : ''}
											</span>{' '}
											in your cart
										</span>
										<button
											onClick={() => setOpen(false)}
											className="p-2 cursor-pointer"
											aria-label="Close cart"
										>
											<X className="size-7 stroke-gray-400" />
										</button>
									</div>

									<div className="basis-full flex flex-col gap-y-2.5 overflow-y-auto">
										{items.map(item => (
											<CartDrawerItem
												disabled={item.disabled}
												onRemoveItem={() => removeCartItem(item.id)}
												onClickCountButton={type =>
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

									<div className="bg-white px-9 py-8 flex flex-col gap-y-5">
										<div className="flex flex-col gap-y-3">
											<div className="flex items-center gap-x-4 w-full">
												<span className="text-black">Total</span>
												<div className="basis-full h-px border-dashed border border-gray-200"></div>
												<span className="text-black text-lg font-bold">
													{totalAmount}$
												</span>
											</div>
											<div className="flex items-center gap-x-4 w-full">
												<span className="text-black">Tax</span>
												<div className="basis-full h-px border-dashed border-gray-200 border"></div>
												<span className="text-black text-lg font-bold">
													150$
												</span>
											</div>
										</div>
										<Button onClick={() => router.push('/checkout')} className="flex items-center gap-x-1 min-h-12">
											<span>Make an order</span>
											<ArrowRight
												size={16}
												className="stroke-white"
											/>
										</Button>
									</div>
								</>
							) : (
								<div className="flex flex-col items-center">
									<img
										className="size-30 mb-5"
										src="/assets/images/empty-box.png"
										alt=""
									/>
									<span className="mb-1.5 inline-block text-[22px] font-bold">
										Your cart is empty
									</span>
									<span className="text-gray-400 text-center inline-block mb-5 max-w-50">
										Add at least one pizza to make an order
									</span>
									<Button
										className="flex min-w-60 min-h-[50px] items-center gap-x-1.5"
										onClick={() => setOpen(false)}
									>
										<ArrowLeft className="w-5 h-5" />
										<span className="text-base font-semibold text-white">
											Go back
										</span>
									</Button>
								</div>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
