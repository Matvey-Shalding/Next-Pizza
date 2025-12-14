'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Button } from '../ui';
import { CartDrawerButton } from './cart-drawer-button';

interface Props {
	className?: string;
	children: ReactNode;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartDrawer: React.FC<Props> = ({ className, children, open, setOpen }) => {
	const [quantity, setQuantity] = React.useState(1);

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
							if (e.target === e.currentTarget) setOpen(false);
						}}
						className='fixed inset-0 z-50 bg-black/50 flex justify-end'
					>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '400px' }}
							exit={{ width: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='h-screen bg-[#F4F1EE] flex flex-col gap-y-5 pt-5'
						>
							<div className='text-lg text-black flex px-5 items-center justify-between w-full'>
								<span>
									<span className='font-bold'>3 items</span> in your card
								</span>

								<div onClick={() => setOpen(false)} className='p-2 cursor-pointer'>
									<X className='size-7 stroke-gray-400' />
								</div>
							</div>
							<div className='basis-full flex flex-col gap-y-2.5 scrollbar overflow-y-auto'>
								<div className='bg-white p-5 flex gap-x-6'>
									<img
										className='size-15'
										src='https://media.dodostatic.net/image/r:1875x1875/019b0c2f0ad074bd925f3df23188fc25.avif'
										alt=''
									/>
									<div className='flex flex-col gap-y-3 basis-full'>
										<div className='flex flex-col gap-y-0.5'>
											<span className='font-bold text-black'>Чизбургер-пицца</span>
											<span className='text-xs text-[#A1A1A1]'>Средняя 30 см, традиционное тесто</span>
										</div>
										<div className='w-full h-px bg-[#EDEDED]'></div>
										<div className='basis-full flex items-center justify-between'>
											<div className='flex items-center gap-x-2'>
												<CartDrawerButton type='minus' disabled={quantity === 1} setQuantity={setQuantity} />
												<span className='text-black font-bold'>{quantity}</span>
												<CartDrawerButton type='plus' disabled={false} setQuantity={setQuantity} />
											</div>
											<span className='text-black font-bold'>2245$</span>
										</div>
									</div>
								</div>
								<div className='bg-white p-5 flex gap-x-6'>
									<img
										className='size-15'
										src='https://media.dodostatic.net/image/r:1875x1875/019b0c2f0ad074bd925f3df23188fc25.avif'
										alt=''
									/>
									<div className='flex flex-col gap-y-3 basis-full'>
										<div className='flex flex-col gap-y-0.5'>
											<span className='font-bold text-black'>Чизбургер-пицца</span>
											<span className='text-xs text-[#A1A1A1]'>Средняя 30 см, традиционное тесто</span>
										</div>
										<div className='w-full h-px bg-[#EDEDED]'></div>
										<div className='basis-full flex items-center justify-between'>
											<div className='flex items-center gap-x-2'>
												<CartDrawerButton type='minus' disabled={quantity === 1} setQuantity={setQuantity} />
												<span className='text-black font-bold'>{quantity}</span>
												<CartDrawerButton type='plus' disabled={false} setQuantity={setQuantity} />
											</div>
											<span className='text-black font-bold'>2245$</span>
										</div>
									</div>
								</div>
								<div className='bg-white p-5 flex gap-x-6'>
									<img
										className='size-15'
										src='https://media.dodostatic.net/image/r:1875x1875/019b0c2f0ad074bd925f3df23188fc25.avif'
										alt=''
									/>
									<div className='flex flex-col gap-y-3 basis-full'>
										<div className='flex flex-col gap-y-0.5'>
											<span className='font-bold text-black'>Чизбургер-пицца</span>
											<span className='text-xs text-[#A1A1A1]'>Средняя 30 см, традиционное тесто</span>
										</div>
										<div className='w-full h-px bg-[#EDEDED]'></div>
										<div className='basis-full flex items-center justify-between'>
											<div className='flex items-center gap-x-2'>
												<CartDrawerButton type='minus' disabled={quantity === 1} setQuantity={setQuantity} />
												<span className='text-black font-bold'>{quantity}</span>
												<CartDrawerButton type='plus' disabled={false} setQuantity={setQuantity} />
											</div>
											<span className='text-black font-bold'>2245$</span>
										</div>
									</div>
								</div>
								<div className='bg-white p-5 flex gap-x-6'>
									<img
										className='size-15'
										src='https://media.dodostatic.net/image/r:1875x1875/019b0c2f0ad074bd925f3df23188fc25.avif'
										alt=''
									/>
									<div className='flex flex-col gap-y-3 basis-full'>
										<div className='flex flex-col gap-y-0.5'>
											<span className='font-bold text-black'>Чизбургер-пицца</span>
											<span className='text-xs text-[#A1A1A1]'>Средняя 30 см, традиционное тесто</span>
										</div>
										<div className='w-full h-px bg-[#EDEDED]'></div>
										<div className='basis-full flex items-center justify-between'>
											<div className='flex items-center gap-x-2'>
												<CartDrawerButton type='minus' disabled={quantity === 1} setQuantity={setQuantity} />
												<span className='text-black font-bold'>{quantity}</span>
												<CartDrawerButton type='plus' disabled={false} setQuantity={setQuantity} />
											</div>
											<span className='text-black font-bold'>2245$</span>
										</div>
									</div>
								</div>
								<div className='bg-white p-5 flex gap-x-6'>
									<img
										className='size-15'
										src='https://media.dodostatic.net/image/r:1875x1875/019b0c2f0ad074bd925f3df23188fc25.avif'
										alt=''
									/>
									<div className='flex flex-col gap-y-3 basis-full'>
										<div className='flex flex-col gap-y-0.5'>
											<span className='font-bold text-black'>Чизбургер-пицца</span>
											<span className='text-xs text-[#A1A1A1]'>Средняя 30 см, традиционное тесто</span>
										</div>
										<div className='w-full h-px bg-[#EDEDED]'></div>
										<div className='basis-full flex items-center justify-between'>
											<div className='flex items-center gap-x-2'>
												<CartDrawerButton type='minus' disabled={quantity === 1} setQuantity={setQuantity} />
												<span className='text-black font-bold'>{quantity}</span>
												<CartDrawerButton type='plus' disabled={false} setQuantity={setQuantity} />
											</div>
											<span className='text-black font-bold'>2245$</span>
										</div>
									</div>
								</div>
							</div>
							<div className='bg-white px-9 py-8 flex flex-col gap-y-5'>
								<div className='flex flex-col gap-y-3'>
									<div className='flex items-center gap-x-4 w-full'>
										<span className='text-black'>Total</span>
										<div className='basis-full h-px border-dashed border-gray-200 border'></div>
										<span className='text-black text-lg font-bold'>2245$</span>
									</div>
									<div className='flex items-center gap-x-4 w-full'>
										<span className='text-black'>Tax</span>
										<div className='basis-full h-px border-dashed border-gray-200 border'></div>
										<span className='text-black text-lg font-bold'>112$</span>
									</div>
								</div>
								<Button className='flex items-center gap-x-1 min-h-12'>
									<span>Make an order</span>
									<ArrowRight size={16} className='stroke-white' />
								</Button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
