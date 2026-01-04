import { InfoBlock } from '@/components/shared'

export function CheckoutEmpty() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Your card is empty"
				text="Add at least one item to make an order"
				imageUrl="/assets/images/lock.png"
			/>
		</div>
	)
}
