'use client';
import {
	Avatar,
	AvatarFallback,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Label,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components';
import { SHOP_ACCOUNT_URL, SHOP_HOME_URL } from '@/constants';
import { AppDispatch, RootState } from '@/store/store';
import { LogOut, Menu, ShoppingCart, Store, UserCog } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from './config';
import { MenuItemsProps } from './types';
import { useRouter } from 'next/navigation';
import { resetTokenAndCredentials, signOutUser } from '@/store/authSlice';
import UserCartWrapper from './cart-wrapper';
import { logo } from '@/assets';
import Image from 'next/image';

function MenuItems() {
	const router = useRouter();

	function handleNavigateToListingPage(currentMenuItem: MenuItemsProps) {
		sessionStorage.removeItem('filters');
		const currentFilter =
			currentMenuItem.id !== 'home' &&
			currentMenuItem.id !== 'products' &&
			currentMenuItem.id !== 'search'
				? {
						category: [currentMenuItem.id],
				  }
				: null;

		sessionStorage.setItem('filters', JSON.stringify(currentFilter));

		router.push(currentMenuItem.path);
	}

	return (
		<nav className="flex flex-col my-4 lg:items-center gap-6 lg:flex-row">
			{shoppingViewHeaderMenuItems.map(
				(menuItem: MenuItemsProps): ReactNode => {
					return (
						<Label
							key={menuItem.id}
							className="text-sm font-medium cursor-pointer"
							onClick={() => handleNavigateToListingPage(menuItem)}
						>
							{menuItem.label}
						</Label>
					);
				}
			)}
		</nav>
	);
}

function HeaderRightContent() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { cart } = useSelector((state: RootState) => state.shopCart);
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const [openCartSheet, setOpenCartSheet] = useState(false);

	function handleLogout() {
		dispatch(signOutUser());
		dispatch(resetTokenAndCredentials());
		sessionStorage.clear();
	}

	return (
		<div className="flex lg:items-center lg:flex-row flex-col gap-4">
			<Sheet
				open={openCartSheet}
				onOpenChange={() => setOpenCartSheet(false)}
			>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setOpenCartSheet(true)}
					className="relative"
				>
					<ShoppingCart className="w-6 h-6" />
					{cart && cart?.items.length > 0 ? (
						<span className="absolute top-[-2px] right-[3px] font-bold">
							{cart?.items.length}
						</span>
					) : null}
					<span className="sr-only">User cart</span>
				</Button>
				<UserCartWrapper setOpenCartSheet={setOpenCartSheet} />
			</Sheet>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="bg-black">
						<AvatarFallback className="bg-black text-white font-extrabold flex justify-center items-center w-10">
							{user?.userName?.charAt(0) || '?'}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side="right"
					className="w-56"
				>
					<DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => router.push(SHOP_ACCOUNT_URL)}>
						<UserCog className="mr-2 h-4 w-4" />
						Account
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout}>
						<LogOut className="mr-2 h-4 w-4" />
						Logout
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ShoppingHeader() {
	// const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<Link
					href={SHOP_HOME_URL}
					className="flex items-center gap-2"
				>
					<Image
						src={logo}
						alt={'logo'}
						width={80}
						height={80}
						priority
						className="w-6 h-6 object-cover rounded-lg"
					/>
					<span className="font-bold">BrandSphere</span>
				</Link>
				<Sheet aria-describedby={undefined}>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="lg:hidden"
						>
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle header menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="w-full max-w-xs"
						aria-describedby={undefined}
					>
						<SheetHeader className="border-b">
							<SheetTitle className="flex gap-2 items-center">
								<Store size={30} />
								<span className="text-xl lg:text-2xl  font-extrabold mt-5 mb-5">
									Shopping
								</span>
							</SheetTitle>
							<SheetDescription id="admin-sidebar" />
						</SheetHeader>
						<MenuItems />
						<HeaderRightContent />
					</SheetContent>
				</Sheet>
				<div className="hidden lg:block">
					<MenuItems />
				</div>
				<div className="hidden lg:block">
					<HeaderRightContent />
				</div>
			</div>
		</header>
	);
}

export default ShoppingHeader;
