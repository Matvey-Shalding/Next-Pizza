'use client'

import {
	CheckoutBlock,
	CheckoutSidebar,
	Container,
	Title
} from '@/components/shared'
import { CheckoutItem } from '@/components/shared/checkout-item'
import { Input, Textarea } from '@/components/ui'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { useCart } from '@/hooks'
import { getItemDetails } from '@/lib/get-item-details'

export default function Checkout() {
	const { items, onClickCountButton, removeCartItem, totalAmount } = useCart()
	return (
		<Container className="pt-10 flex flex-col gap-y-12 pb-20">
			<Title
				text="Checkout"
				size="lg"
				className="font-bold text-[36px]"
			/>
			<div className="grid grid-cols-[1.67fr_1fr] gap-11">
				<div className="flex flex-col gap-y-11">
					<CheckoutBlock title="1.Cart">
						<div className="flex flex-col gap-y-6">
							{items.map(item => (
								<CheckoutItem
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
					</CheckoutBlock>
					<CheckoutBlock title="2.Personal details">
						<div className="grid grid-cols-2 gap-11">
							<div className="flex flex-col gap-y-2">
								<span className="text-black font-bold text-sm">Name</span>
								<Input placeholder="John" />
							</div>
							<div className="flex flex-col gap-y-2">
								<span className="text-black font-bold text-sm">Surname</span>
								<Input placeholder="Doe" />
							</div>{' '}
							<div className="flex flex-col gap-y-2">
								<span className="text-black font-bold text-sm">E-Mail</span>
								<Input placeholder="johndoe@gmail.com" />
							</div>{' '}
							<div className="flex flex-col gap-y-2">
								<span className="text-black font-bold text-sm">
									Phone number
								</span>
								<Input placeholder="+7 (999) 999-99-99" />
							</div>
						</div>
					</CheckoutBlock>
					<CheckoutBlock title="3.Personal details">
						<div className="flex flex-col gap-y-5">
							<div className="flex flex-col gap-y-2">
								<span className="text-black font-bold text-sm">
									Shipping address
								</span>
								<Input placeholder="Moscow, Lenina st. 12" />
							</div>
							<div className="flex flex-col gap-y-2">
								<span className="text-black font-bold text-sm">Order note</span>
								<Textarea
									rows={5}
									className="resize-none"
									placeholder="enter additional delivery instructions"
								/>
							</div>
						</div>
					</CheckoutBlock>
				</div>
				<CheckoutSidebar totalAmount={totalAmount} />
			</div>
		</Container>
	)
}
