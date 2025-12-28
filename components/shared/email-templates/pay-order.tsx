// components/PayOrderTemplate.tsx
import {
	Body,
	Button,
	Container,
	Heading,
	Html,
	Link,
	Section,
	Tailwind,
	Text
} from '@react-email/components'

interface Props {
	orderId: number
	totalAmount: number
	paymentUrl: string
}

export default function PayOrderTemplate({
	orderId,
	totalAmount,
	paymentUrl
}: Props) {
	return (
		<Html>
			<Body style={{ backgroundColor: '#f9fafb', margin: 0, padding: 0 }}>
				<Tailwind>
					<Container className="mx-auto bg-white p-6 max-w-lg rounded-lg">
						<Section className="text-center mb-6">
							<Heading className="text-2xl font-bold text-gray-800">
								Order #{orderId}
							</Heading>
							<Text className="text-gray-600 mt-2">Payment Required</Text>
						</Section>

						<Section className="mb-6">
							<Text className="text-gray-700 text-base leading-relaxed">
								Please complete your payment for order #{orderId} totaling{' '}
								<strong className="text-lg text-blue-600">
									${totalAmount.toFixed(2)}
								</strong>
								.
							</Text>

							<Text className="text-gray-700 mt-4">
								Click the button below to securely proceed to checkout:
							</Text>

							{/* ⚠️ Removed hover/focus classes — they don't work in emails */}
							<Button
								href={paymentUrl}
								className="inline-block mt-4 bg-blue-600 text-white font-medium py-3 px-6 rounded-lg"
							>
								Pay Now
							</Button>

							<Text className="text-gray-500 text-sm mt-4">
								Or copy and paste this link into your browser:{' '}
								<Link
									href={paymentUrl}
									className="text-blue-500 break-all"
								>
									{paymentUrl}
								</Link>
							</Text>
						</Section>

						<Section className="border-t border-gray-200 pt-4 text-center">
							<Text className="text-gray-500 text-xs">
								If you did not place this order, please ignore this email.
							</Text>
						</Section>
					</Container>
				</Tailwind>
			</Body>
		</Html>
	)
}
