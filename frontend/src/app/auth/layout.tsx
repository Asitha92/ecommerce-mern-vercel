'use client';
import { AuthLayoutProps } from './types';
import CheckAuthentication from '@/utils/checkAuth/CheckAuthentication';

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<CheckAuthentication>
			<div className="flex min-h-screen w-full">
				<div className="hidden lg:flex items-center justify-center w-1/2 bg-black px-12">
					<div className="max-w-md space-y-6 text-center text-white">
						<h1 className="text-4xl font-extrabold tracking-tight">
							Welcome to BrandSphere Shopping
						</h1>
					</div>
				</div>
				<div className="flex flex-1 items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
					{children}
				</div>
			</div>
		</CheckAuthentication>
	);
}
