'use client'

import { Button } from '@/components/ui'
import { useCart } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CartDrawerEmpty, CartDrawerList } from '.'

export const CartDrawer = ({
	open,
	setOpen,
	children
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
}) => {
	const { items, onClickCountButton, removeCartItem, totalAmount } = useCart()
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
							className="h-screen bg-[#F4F1EE] flex flex-col gap-y-5 pt-5"
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

									<CartDrawerList
										items={items}
										onClickCountButton={onClickCountButton}
										removeCartItem={removeCartItem}
									/>

									<div className="bg-white px-9 py-8 flex flex-col gap-y-5">
										<div className="flex items-center gap-x-4 w-full">
											<span className="text-black">Total</span>
											<div className="basis-full h-px border-dashed border border-gray-200"></div>
											<span className="text-black text-lg font-bold">
												{totalAmount}$
											</span>
										</div>
										<div className="flex items-center gap-x-4 w-full">
											<span className="text-black">Tax</span>
											<div className="basis-full h-px border-dashed border border-gray-200"></div>
											<span className="text-black text-lg font-bold">
												150$
											</span>
										</div>
										<Button
											onClick={() => router.push('/checkout')}
											className="flex items-center gap-x-1 min-h-12"
										>
											<span>Make an order</span>
											<ArrowRight
												size={16}
												className="stroke-white"
											/>
										</Button>
									</div>
								</>
							) : (
								<CartDrawerEmpty onClose={() => setOpen(false)} />
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
