import { nunito } from '@/config/font'

import { Providers } from '@/components/shared/providers'
import './globals.css'

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
