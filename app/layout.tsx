import { Providers } from '@/components/shared/providers'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<Providers>
					<main className="min-h-screen">{children}</main>
				</Providers>
			</body>
		</html>
	)
}
