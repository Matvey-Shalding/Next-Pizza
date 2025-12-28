// components/email-template.tsx
import { Body, Container, Heading, Html } from '@react-email/components'

interface EmailTemplateProps {
	firstName: string
}

export default function EmailTemplate({ firstName }: EmailTemplateProps) {
	return (
		<Html>
			<Body>
				<Container>
					<Heading>Welcome, {firstName}!</Heading>
				</Container>
			</Body>
		</Html>
	)
}
