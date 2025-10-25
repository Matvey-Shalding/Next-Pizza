import { Header } from '@/components/shared/header';
import { nunito } from '@/config/font';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Next pizza | Home page',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<main className='min-h-screen'>
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
