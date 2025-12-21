import { nunito } from '@/config/font';
import { Toaster } from 'react-hot-toast';

import './globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<main className='min-h-screen'>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
