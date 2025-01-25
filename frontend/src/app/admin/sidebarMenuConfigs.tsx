import {
	ADMIN_DASHBOARD_URL,
	ADMIN_ORDERS_URL,
	ADMIN_PRODUCTS_URL,
} from '@/constants';
import { ClockArrowUp, LayoutDashboard, PackageOpen } from 'lucide-react';
import { SidebarItem } from './types';

export const adminSideBarMenuItems: SidebarItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		path: ADMIN_DASHBOARD_URL,
		icon: <LayoutDashboard />,
	},
	{
		id: 'products',
		label: 'Products',
		path: ADMIN_PRODUCTS_URL,
		icon: <PackageOpen />,
	},
	{
		id: 'orders',
		label: 'Orders',
		path: ADMIN_ORDERS_URL,
		icon: <ClockArrowUp />,
	},
];
