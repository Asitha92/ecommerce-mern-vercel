'use client';
import { Button, SheetContent, SheetHeader, SheetTitle } from '@/components';
import { AppDispatch, RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from './cart-items-content';
import { fetchCartItems } from '@/store/shop/cartSlice';
import { useRouter } from 'next/navigation';
import { SHOP_CHECKOUT_URL } from '@/constants';

function UserCartWrapper({
	setOpenCartSheet,
}: {
	setOpenCartSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { cart } = useSelector((state: RootState) => state.shopCart);
	const { user } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	const totalCartCount =
		cart && cart?.items?.length > 0
			? cart?.items?.reduce(
					(sum, currentItem) =>
						sum +
						(currentItem?.salePrice > 0
							? currentItem?.salePrice
							: currentItem?.price) *
							currentItem.quantity,
					0
			  )
			: 0;

	useEffect(() => {
		if (user && user.id) dispatch(fetchCartItems(user.id));
	}, [dispatch, user]);

	return (
		<SheetContent
			className="sm:max-w-md"
			aria-describedby={undefined}
		>
			<SheetHeader>
				<SheetTitle>Your Cart</SheetTitle>
			</SheetHeader>
			<div className="mt-8 space-y-4">
				{cart && cart.items.length > 0
					? cart.items.map((item) => (
							<div key={item._id}>
								<UserCartItemsContent cartItem={item} />
							</div>
					  ))
					: null}
			</div>
			<div className="mt-8 space-y-4">
				<div className="flex justify-between items-center">
					<span className="font-bold">Total</span>
					<span className="font-bold">
						{new Intl.NumberFormat('en-GB', {
							style: 'currency',
							currency: 'GBP',
						}).format(totalCartCount)}
					</span>
				</div>
			</div>
			<Button
				onClick={() => {
					router.push(SHOP_CHECKOUT_URL);
					setOpenCartSheet(false);
				}}
				className="w-full"
				disabled={cart?.items.length === 0 || cart?.items.length === undefined}
			>
				Checkout
			</Button>
		</SheetContent>
	);
}

export default UserCartWrapper;
