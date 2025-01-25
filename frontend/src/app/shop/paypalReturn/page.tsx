'use client';

import { Card, CardHeader, CardTitle } from '@/components';
import { capturePayment } from '@/store/shop/orderSlice';
import { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';

function PaypalReturnPage() {
	const dispatch = useDispatch<AppDispatch>();
	const searchParams = useSearchParams();
	const router = useRouter();
	const paymentId = searchParams.get('paymentId');
	const PayerID = searchParams.get('PayerID');

	useEffect(() => {
		if (paymentId && PayerID) {
			const orderId = JSON.parse(
				sessionStorage.getItem('currentOrderId') || 'null'
			);
			dispatch(capturePayment({ paymentId, PayerID, orderId })).then((data) => {
				if (data?.payload?.success) {
					sessionStorage.removeItem('currentOrderId');
					router.push('/shop/paymentSuccess');
				}
			});
		}
	}, [paymentId, PayerID, dispatch, router]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Processing Payment...Please wait!</CardTitle>
			</CardHeader>
		</Card>
	);
}

export default PaypalReturnPage;
