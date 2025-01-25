'use client';

import { DialogContent, DialogTitle, Label, Separator } from '@/components';
import { RootState } from '@/store/store';
import { Badge } from 'lucide-react';
import { useSelector } from 'react-redux';
import { OrderDetailsProps } from './types';

function ShoppingOrderDetails({ orderDetails }: OrderDetailsProps) {
	const { user } = useSelector((state: RootState) => state.auth);

	return (
		<DialogContent
			className="gap-8 sm:p-12 max-w-full sm:max-w-full lg:max-w-[60vw] h-full sm:h-[60vw] lg:h-[40vw] rounded-lg max-h-[80vh] overflow-y-auto"
			aria-describedby={undefined}
		>
			<DialogTitle></DialogTitle>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<div className="flex mt-6 items-center justify-between">
						<p className="font-medium">Order ID</p>
						<Label>{orderDetails?._id}</Label>
					</div>
					<div className="flex mt-2 items-center justify-between">
						<p className="font-medium">Order Date</p>
						<Label>{orderDetails?.orderDate.split('T')[0]}</Label>
					</div>
					<div className="flex mt-2 items-center justify-between">
						<p className="font-medium">Order Price</p>
						<Label>${orderDetails?.totalAmount}</Label>
					</div>
					<div className="flex mt-2 items-center justify-between">
						<p className="font-medium">Payment method</p>
						<Label>{orderDetails?.paymentMethod}</Label>
					</div>
					<div className="flex mt-2 items-center justify-between">
						<p className="font-medium">Payment Status</p>
						<Label>{orderDetails?.paymentStatus}</Label>
					</div>
					<div className="flex mt-2 items-center justify-between">
						<p className="font-medium">Order Status</p>
						<Label className="flex gap-2 items-center">
							<Badge
								className={`py-1 px-3 rounded-full ${
									orderDetails?.orderStatus === 'confirmed'
										? 'bg-green-500'
										: orderDetails?.orderStatus === 'rejected'
										? 'bg-red-600'
										: 'bg-amber-500'
								}`}
							/>
							{orderDetails?.orderStatus}
						</Label>
					</div>
				</div>
				<Separator />
				<div className="grid gap-4">
					<div className="grid gap-2">
						<div className="font-medium">Order Details</div>
						<ul className="grid gap-3">
							{orderDetails?.cartItems && orderDetails?.cartItems.length > 0
								? orderDetails?.cartItems.map((item) => (
										<li
											key={item._id}
											className="flex items-center justify-between"
										>
											<span>Title: {item.title}</span>
											<span>Quantity: {item.quantity}</span>
											<span>Price: £ {item.price}</span>
										</li>
								  ))
								: null}
						</ul>
					</div>
				</div>

				<Separator />
				<div className="grid gap-4 overflow-auto">
					<div className="grid gap-2">
						<div className="font-medium">Shipping Info</div>
						<div className="gap-0.5 text-muted-foreground flex">
							<span>Address: {user?.userName}, </span>
							<span>{orderDetails?.addressInfo?.address}, </span>
							<span>{orderDetails?.addressInfo?.city}, </span>
							<span>{orderDetails?.addressInfo?.zipCode}.</span>
						</div>
						<div className="grid gap-0.5 text-muted-foreground ">
							<span>Phone: {orderDetails?.addressInfo?.phone}</span>
							<span>Notes: {orderDetails?.addressInfo?.notes}</span>
						</div>
					</div>
				</div>
			</div>
		</DialogContent>
	);
}

export default ShoppingOrderDetails;
