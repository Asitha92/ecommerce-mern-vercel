'use client';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Dialog,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { AppDispatch, RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminOrderDetails from './orderDetails';
import { OrderItem } from './types';
import {
	getAllOrdersForAdmin,
	getOrderDetailsForAdmin,
	resetOrderDetails,
} from '@/store/admin/ordersSlice';

function Orders() {
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
	const { orderList, orderDetails } = useSelector(
		(state: RootState) => state.adminOrder
	);
	const dispatch = useDispatch<AppDispatch>();

	function handleFetchOrderDetails(_id: string): void {
		dispatch(getOrderDetailsForAdmin(_id));
	}

	useEffect(() => {
		dispatch(getAllOrdersForAdmin());
	}, [dispatch]);

	useEffect(() => {
		if (orderDetails !== null) setOpenDetailsDialog(true);
	}, [orderDetails]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>All Orders</CardTitle>
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
									<TableRow key={orderItem._id}>
										<TableCell>{orderItem?._id}</TableCell>
										<TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
										<TableCell>
											<Badge
												className={`py-1 px-3 ${
													orderItem?.orderStatus === 'confirmed'
														? 'bg-green-500'
														: orderItem?.orderStatus === 'rejected'
														? 'bg-red-600'
														: 'bg-black'
												}`}
											>
												{orderItem?.orderStatus}
											</Badge>
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
												<AdminOrderDetails orderDetails={orderDetails} />
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
