'use client';
import {
	ADMIN,
	ADMIN_DASHBOARD_URL,
	ADMIN_ROLE,
	RESTRICTED_URl,
	SHOP,
	SHOP_HOME_URL,
	SIGNIN,
	SIGNIN_URL,
	SIGNUP,
} from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/store/store';
import { Skeleton } from '@/components/ui/skeleton';

const CheckAuthentication: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const { isAuthenticated, isLoading, user } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		// Redirect if not authenticated and trying to access restricted pages
		if (
			!isAuthenticated &&
			!isLoading &&
			!(pathname.includes(SIGNIN) || pathname.includes(SIGNUP))
		) {
			router.push(SIGNIN_URL);
		}

		// Redirect authenticated users away from sign-in or sign-up pages
		if (
			isAuthenticated &&
			(pathname.includes(SIGNIN) || pathname.includes(SIGNUP))
		) {
			if (user?.role === ADMIN_ROLE) {
				router.push(ADMIN_DASHBOARD_URL);
			} else {
				router.push(SHOP_HOME_URL);
			}
		}

		// Prevent non-admin users from accessing admin pages
		if (
			isAuthenticated &&
			user?.role !== ADMIN_ROLE &&
			pathname.includes(ADMIN)
		) {
			router.push(RESTRICTED_URl);
		}

		// Prevent admins from accessing shop pages
		if (
			isAuthenticated &&
			user?.role === ADMIN_ROLE &&
			pathname.includes(SHOP)
		) {
			router.push(ADMIN_DASHBOARD_URL);
		}
	}, [isAuthenticated, pathname, router, user, isLoading]);

	return (
		<>
			{isLoading ? (
				<Skeleton className="w-[600px] h-[400px] rounded-full" />
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default CheckAuthentication;
