import { Header } from '@/components/shared'
import { nunito } from '@/config/font'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next pizza | Home page'
}

export default function RootLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={cn(nunito.className, 'scrollbar')}>
				<main className="min-h-screen" >
					<Header />
					{modal}
					{children}
				</main>
			</body>
		</html>
	)
}
