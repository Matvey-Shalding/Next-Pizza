import React from 'react'
import { CheckoutBlock } from '.'
import { FormInput } from '../form'
interface Props {
	className?: string
}
export const PersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<CheckoutBlock title="2.Personal details">
			<div className="grid tablet:grid-cols-2 grid-cols-1 tablet:gap-6 phone:gap-5 small-phone:gap-4 small-laptop:gap-8">
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
