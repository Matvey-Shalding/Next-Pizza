import React from 'react'
import { CheckoutBlock } from '.'
import { AddressInput } from '../form/address-input'
import { FormTextArea } from '../form'
interface Props {
	className?: string
}
export const AdditionalInformation: React.FC<Props> = ({ className }) => {
	return (
		<CheckoutBlock title="3.Personal details">
			<div className="flex flex-col gap-y-5">
				<AddressInput />
				<FormTextArea
					name="comment"
					label="Order note"
					rows={5}
					className="resize-none!"
					placeholder="enter additional delivery instructions"
				/>
			</div>
		</CheckoutBlock>
	)
}
