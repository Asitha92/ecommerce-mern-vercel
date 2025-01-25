'use client';

import { AppDispatch, RootState } from '@/store/store';
import { Button } from '@/components';
import { checkoutImage } from '@/assets';
import { AddressData } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Address from '../account/address';
import Image from 'next/image';
import UserCartItemsContent from '../cart-items-content';
import { createNewOrder } from '@/store/shop/orderSlice';

function ShoppingCheckout() {
	const { cart } = useSelector((state: RootState) => state.shopCart);
	const { user } = useSelector((state: RootState) => state.auth);
	const { approvalURL } = useSelector((state: RootState) => state.shopOrder);
	const [currentSelectedAddress, setCurrentSelectedAddress] =
		useState<AddressData>(null);
	const [isPaymentStart, setIsPaymentStart] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { toast } = useToast();

	const totalCartAmount =
		cart && cart.items && cart.items.length > 0
			? cart.items.reduce(
					(sum, currentItem) =>
						sum +
						(currentItem?.salePrice > 0
							? currentItem?.salePrice
							: currentItem?.price) *
							currentItem?.quantity,
					0
			  )
			: 0;

	function handleInitiatePaypalPayment() {
		if (cart === null || cart.items === null) {
			toast({
				title: 'Your cart is empty. Please add items to proceed !',
				variant: 'destructive',
			});

			return;
		}
		if (currentSelectedAddress === null) {
			toast({
				title: 'Please select one address to proceed. !',
				variant: 'destructive',
			});

			return;
		}

		const orderData = {
			userId: user?.id,
			cartId: cart?._id,
			cartItems: cart?.items.map((singleCartItem) => ({
				productId: singleCartItem?._id,
				title: singleCartItem?.title,
				image: singleCartItem?.image,
				price:
					singleCartItem?.salePrice > 0
						? singleCartItem?.salePrice
						: singleCartItem?.price,
				quantity: singleCartItem?.quantity,
			})),
			addressInfo: {
				address: currentSelectedAddress?.address,
				addressId: currentSelectedAddress?._id,
				city: currentSelectedAddress?.city,
				notes: currentSelectedAddress?.notes,
				phone: currentSelectedAddress?.phone,
				zipCode: currentSelectedAddress?.zipCode,
			},
			orderStatus: 'pending',
			paymentMethod: 'paypal',
			paymentStatus: 'pending',
			totalAmount: totalCartAmount,
			orderDate: new Date(),
			orderUpdateDate: new Date(),
			paymentId: '',
			payerId: '',
		};

		dispatch(createNewOrder(orderData)).then((data) => {
			if (data?.payload?.success) {
				setIsPaymentStart(true);
			} else {
				setIsPaymentStart(false);
			}
		});
	}

	function handleCurrentAddress(currentAddress: AddressData) {
		setCurrentSelectedAddress(currentAddress);
	}

	// redirect to paypal page
	if (approvalURL) {
		window.location.href = approvalURL;
	}

	return (
		<div className="flex flex-col">
			<div className="relative h-[300px] w-full overflow-hidden">
				<Image
					src={checkoutImage}
					alt={'checkout image'}
					priority
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
				<Address
					selectedAddressId={
						currentSelectedAddress ? currentSelectedAddress._id : null
					}
					handleCurrentAddress={handleCurrentAddress}
				/>
				<div className="flex flex-col gap-4">
					{cart && cart.items && cart.items.length > 0
						? cart.items.map((item) => (
								<span key={item._id}>
									<UserCartItemsContent cartItem={item} />
								</span>
						  ))
						: null}
					<div className="mt-8 space-y-4">
						<div className="flex justify-between">
							<span className="font-bold">Total</span>
							<span className="font-bold">${totalCartAmount}</span>
						</div>
					</div>
					<div className="mt-4 w-full">
						<Button
							onClick={handleInitiatePaypalPayment}
							className="w-full"
						>
							{isPaymentStart
								? 'Processing Paypal Payment...'
								: 'Checkout with Paypal'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCheckout;
