'use client';

import { Skeleton } from '@/components';
import { SHOP_HOME_URL, SIGNIN_URL } from '@/constants';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Home() {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated) {
			router.push(SIGNIN_URL);
		}

		if (isAuthenticated) {
			router.push(SHOP_HOME_URL);
		}
	}, []);

	return (
		<div>
			<Skeleton className="h-10 bg-gray-500" />
			<Skeleton className="h-10 bg-gray-500" />
			<Skeleton className="h-10 bg-gray-500" />
		</div>
	);
}

export default Home;
