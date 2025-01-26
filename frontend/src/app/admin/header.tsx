'use client';
import { Button } from '@/components';
import { AlignJustify, LogOut } from 'lucide-react';
import React from 'react';
import { AdminHeaderProps } from './types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { resetTokenAndCredentials, signOutUser } from '@/store/authSlice';

function AdminHeader({ setIsOpen }: AdminHeaderProps) {
	const dispatch = useDispatch<AppDispatch>();

	function handleSignOut() {
		dispatch(signOutUser());
		dispatch(resetTokenAndCredentials());
		sessionStorage.clear();
	}
	return (
		<header className="flex items-center justify-between px-4 py-3 bg-background border-b">
			<Button
				className="lg:hidden sm:block"
				onClick={() => setIsOpen(true)}
			>
				<AlignJustify />
				<span className="sr-only">Toggle Menu</span>
			</Button>
			<div className="flex flex-1 justify-end">
				<Button
					className="inline-flex gap-2 item-center rounded-md px-4 py-2 text-sm font-medium shadow"
					onClick={handleSignOut}
				>
					<LogOut />
					Logout
				</Button>
			</div>
		</header>
	);
}

export default AdminHeader;
