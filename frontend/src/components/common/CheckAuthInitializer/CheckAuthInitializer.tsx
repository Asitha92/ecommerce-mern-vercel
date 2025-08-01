'use client';
import { AppDispatch } from '@/store/store';
import { checkAuth } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const CheckAuthInitializer: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const tokenString = sessionStorage.getItem('token');
		let parsedToken = null;

		try {
			if (tokenString && tokenString !== 'undefined') {
				parsedToken = JSON.parse(tokenString);
			}
		} catch (error) {
			console.error('Failed to parse token:', error);
		}
		dispatch(checkAuth(parsedToken));
	}, [dispatch]);

	return null; // This component doesn't render anything
};

export default CheckAuthInitializer;
