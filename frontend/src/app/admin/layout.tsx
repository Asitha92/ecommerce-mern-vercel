'use client';
import { useState } from 'react';
import AdminHeader from './header';
import AdminSidebar from './sidebar';
import { AdminViewLayoutProps } from './types';
import CheckAuthentication from '@/utils/checkAuth/CheckAuthentication';

function AdminLayout({ children }: AdminViewLayoutProps) {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);

	return (
		<CheckAuthentication>
			<div className="flex min-h-screen w-full">
				{/* admin sidebar */}
				<AdminSidebar
					isOpen={isSideBarOpen}
					setIsOpen={setIsSideBarOpen}
				/>
				<div className="flex flex-1 flex-col">
					{/* admin header */}
					<AdminHeader setIsOpen={setIsSideBarOpen} />
					<main className="flex flex-col flex-1 bg-muted/40 p-4 md:p-6">
						{children}
					</main>
				</div>
			</div>
		</CheckAuthentication>
	);
}

export default AdminLayout;
