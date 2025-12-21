import { Header } from '@/components/shared/header';
import { nunito } from '@/config/font';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next pizza | Home page',
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<main className='min-h-screen'>
					<Header />
					{modal}
					{children}
				</main>
			</body>
		</html>
	);
}
