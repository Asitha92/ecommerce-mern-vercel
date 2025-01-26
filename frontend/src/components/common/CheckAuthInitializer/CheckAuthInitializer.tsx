'use client';
import { AppDispatch } from '@/store/store';
import { checkAuth } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const CheckAuthInitializer: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		const parsedToken = token ? JSON.parse(token) : null;
		dispatch(checkAuth(parsedToken));
	}, [dispatch]);

	return null; // This component doesn't render anything
};

export default CheckAuthInitializer;
