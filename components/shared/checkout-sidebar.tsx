import { Package, Percent, Truck } from 'lucide-react'
import React, { useMemo } from 'react'
import { Button } from '../ui'
interface Props {
	className?: string
	totalAmount: number
}
export const CheckoutSidebar: React.FC<Props> = ({
	className,
	totalAmount
}) => {
	const TAX = useMemo(() => {
		return Math.round(totalAmount * 0.2)
	}, [totalAmount])

	const SHIPPING_COST = 150

	const total = useMemo(() => {
		return totalAmount + TAX + SHIPPING_COST
	}, [totalAmount])

	return (
		<div className="flex flex-col self-start py-11 gap-y-6 bg-white rounded-[30px]">
			<div className="flex flex-col pb-7 pl-11 border-b border-gray-200">
				<span className="text-black text-[22px]">Total</span>
				<span className="font-extrabold text-[34px] text-black">{total}$</span>
			</div>
			<div className="flex flex-col gap-y-4 px-11 pb-8 border-b border-gray-200">
				<div className="flex items-center gap-x-4 w-full">
					<div className="flex items-center gap-x-1.5">
						<Package className="size-4" />
						<span className="text-black whitespace-nowrap">Cart price</span>
					</div>
					<div className="basis-full h-px border-dashed border-gray-200 border"></div>
					<span className="text-black text-lg font-bold">{totalAmount}</span>
				</div>
				<div className="flex items-center gap-x-4 w-full">
					<div className="flex items-center gap-x-1.5">
						<Percent className="size-4" />
						<span className="text-black whitespace-nowrap">Tax</span>
					</div>
					<div className="basis-full h-px border-dashed border-gray-200 border"></div>
					<span className="text-black text-lg font-bold">{TAX}$</span>
				</div>
				<div className="flex items-center gap-x-4 w-full">
					<div className="flex items-center gap-x-1.5">
						<Truck className="size-4" />
						<span className="text-black whitespace-nowrap">Delivery</span>
					</div>
					<div className="basis-full h-px border-dashed border-gray-200 border"></div>
					<span className="text-black text-lg font-bold">{SHIPPING_COST}$</span>
				</div>
			</div>
			<Button className="mx-11 min-h-15 font-bold text-lg">
				Proceed to payment
			</Button>
		</div>
	)
}
