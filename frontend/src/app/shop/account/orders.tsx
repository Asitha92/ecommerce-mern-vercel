'use client';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Button,
	Dialog,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { AppDispatch, RootState } from '@/store/store';
import { Badge } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingOrderDetails from './orderDetails';
import { OrderItem } from './types';
import {
	getAllOrdersByUserId,
	getOrderDetails,
	resetOrderDetails,
} from '@/store/shop/orderSlice';

function Orders() {
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	const { orderList, orderDetails } = useSelector(
		(state: RootState) => state.shopOrder
	);

	function handleFetchOrderDetails(id: string) {
		dispatch(getOrderDetails(id));
	}

	useEffect(() => {
		if (user?.id) dispatch(getAllOrdersByUserId(user?.id));
	}, [dispatch, user?.id]);

	useEffect(() => {
		if (orderDetails !== null) setOpenDetailsDialog(true);
	}, [orderDetails]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Order History</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Order Date</TableHead>
							<TableHead>Order Status</TableHead>
							<TableHead>Order Price</TableHead>
							<TableHead>
								<span className="sr-only">Details</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orderList && orderList.length > 0
							? orderList.map((orderItem: OrderItem) => (
									<TableRow key={orderItem?._id}>
										<TableCell>{orderItem?._id}</TableCell>
										<TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
										<TableCell className="flex gap-2 items-center">
											<Badge
												className={`py-1 px-3 rounded-full ${
													orderItem?.orderStatus === 'confirmed'
														? 'bg-green-500'
														: orderItem?.orderStatus === 'rejected'
														? 'bg-red-600'
														: 'bg-amber-500'
												}`}
											/>
											{orderItem?.orderStatus}
										</TableCell>
										<TableCell>${orderItem?.totalAmount}</TableCell>
										<TableCell>
											<Dialog
												open={openDetailsDialog}
												onOpenChange={() => {
													setOpenDetailsDialog(false);
													dispatch(resetOrderDetails());
												}}
											>
												<Button
													onClick={() =>
														handleFetchOrderDetails(orderItem?._id)
													}
												>
													View Details
												</Button>
												<ShoppingOrderDetails orderDetails={orderDetails} />
											</Dialog>
										</TableCell>
									</TableRow>
							  ))
							: null}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export default Orders;
