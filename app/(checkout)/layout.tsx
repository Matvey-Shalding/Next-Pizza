import { Container } from '@/components/shared'
import { Header } from '@/components/shared/header'
import { nunito } from '@/config/font'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next pizza | Checkout'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className={cn('min-h-screen bg-[#F4F1EE]', nunito.className)}>
			<Container>
				<Header
					className="border-b border-gray-200"
					hasCartButton={false}
					hasSearch={false}
				/>
			</Container>
			{children}
		</main>
	)
}
