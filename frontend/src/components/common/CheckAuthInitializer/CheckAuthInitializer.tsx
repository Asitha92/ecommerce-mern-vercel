'use client';
import { AppDispatch } from '@/store/store';
import { checkAuth } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const CheckAuthInitializer: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return null; // This component doesn't render anything
};

export default CheckAuthInitializer;
