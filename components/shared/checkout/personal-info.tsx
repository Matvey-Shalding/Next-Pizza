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
					placeholder="John"
				/>
				<FormInput
					placeholder="Doe"
					label="Surname"
					name="lastName"
				/>
				<FormInput
					placeholder="johndoe@gmail.com"
					label="Email"
					name="email"
				/>
				<FormInput
					placeholder="+7 (999) 999-99-99"
					label="Phone number"
					name="phone"
				/>
			</div>
		</CheckoutBlock>
	)
}
