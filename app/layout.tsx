import { nunito } from '@/config/font';
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
			</body>
		</html>
	);
}
