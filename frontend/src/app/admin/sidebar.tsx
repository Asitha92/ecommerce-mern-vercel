import { ChartNoAxesCombined } from 'lucide-react';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_DASHBOARD_URL } from '@/constants';
import { adminSideBarMenuItems } from './sidebarMenuConfigs';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription, // Import SheetDescription
} from '@/components/ui/sheet';
import { AdminSideBarProps } from './types';

function AdminSidebar({ isOpen, setIsOpen }: AdminSideBarProps) {
	const router = useRouter();

	function handleNavigation(url: string): void {
		router.push(url);
		setIsOpen(false);
	}

	function generateMenuItems(): React.ReactNode {
		return (
			<nav className="mt-8 flex-col flex gap-2">
				{adminSideBarMenuItems.map((sidebarItem) => (
					<div
						key={sidebarItem.id}
						className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
						onClick={() => handleNavigation(sidebarItem.path)}
					>
						{sidebarItem.icon}
						<span>{sidebarItem.label}</span>
					</div>
				))}
			</nav>
		);
	}

	return (
		<Fragment>
			<Sheet
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<SheetContent
					side="left"
					className="w-64"
					aria-describedby={undefined}
				>
					<div className="flex flex-col h-full">
						<SheetHeader className="border-b">
							<SheetTitle className="flex gap-2 items-center">
								<ChartNoAxesCombined size={30} />
								<span className="text-xl lg:text-2xl  font-extrabold mt-5 mb-5">
									Admin Panel
								</span>
							</SheetTitle>
							<SheetDescription id="admin-sidebar" />
						</SheetHeader>
						{generateMenuItems()}
					</div>
				</SheetContent>
			</Sheet>
			<aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
				<div
					className="flex items-center gap-2 cursor-pointer"
					onClick={() => handleNavigation(ADMIN_DASHBOARD_URL)}
				>
					<ChartNoAxesCombined size={30} />
					<span className="text-2xl font-extrabold mt-5 mb-5">Admin Panel</span>
				</div>
				{generateMenuItems()}
			</aside>
		</Fragment>
	);
}

export default AdminSidebar;
