import { Container } from '@/components/shared'
import { Header } from '@/components/shared/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next pizza | Checkout',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
				<main className='min-h-screen bg-[#F4F1EE]'>
					<Container><Header className='border-b border-gray-200' hasCartButton={false} hasSearch={false} /></Container>
					{children}
				</main>
	);
}
