'use client';
import './globals.css';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';
import CheckAuthInitializer from '@/components/common/CheckAuthInitializer/CheckAuthInitializer';
import store from '@/store/store';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					<CheckAuthInitializer />
					{children}
					<Toaster />
				</Provider>
			</body>
		</html>
	);
}
