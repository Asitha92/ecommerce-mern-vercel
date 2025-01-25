'use client';
import { Button, Card, CardHeader, CardTitle } from '@/components';
import { SHOP_ACCOUNT_URL } from '@/constants';
import { useRouter } from 'next/navigation';

function PaymentSuccessPage() {
	const router = useRouter();

	return (
		<Card className="p-10">
			<CardHeader className="p-0">
				<CardTitle className="text-4xl">Payment is successful !</CardTitle>
			</CardHeader>
			<Button
				className="mt-5"
				onClick={() => router.push(SHOP_ACCOUNT_URL)}
			>
				View Orders
			</Button>
		</Card>
	);
}

export default PaymentSuccessPage;
