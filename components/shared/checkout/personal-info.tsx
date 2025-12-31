import React from 'react'
import { CheckoutBlock } from '.'
import { FormInput } from '../form'
interface Props {
	className?: string
}
export const PersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<CheckoutBlock title="2.Personal details">
			<div className="grid grid-cols-2 gap-11">
				<FormInput
					label="Name"
					name="firstName"
				/>
				<FormInput
					label="Surname"
					name="lastName"
				/>
				<FormInput
					label="Email"
					name="email"
				/>
				<FormInput
					label="Phone number"
					name="phone"
				/>
			</div>
		</CheckoutBlock>
	)
}
