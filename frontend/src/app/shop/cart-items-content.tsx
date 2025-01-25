'use client';

import Image from 'next/image';
import { CartItem, UserCartItemsContentProps } from './types';
import { Button } from '@/components';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
	deleteCartItems,
	updateCartItemsQuantity,
} from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';

function UserCartItemsContent({ cartItem }: UserCartItemsContentProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { cart } = useSelector((state: RootState) => state.shopCart);
	const { user } = useSelector((state: RootState) => state.auth);
	const {
		productList,
	}: { productList: Array<{ _id: string; totalStock: number }> } = useSelector(
		(state: RootState) => state.shopProducts
	);

	const { toast } = useToast();

	function handleCartItemDelete(deletedCartItem: CartItem) {
		if (user?.id) {
			dispatch(
				deleteCartItems({ userId: user?.id, productId: deletedCartItem?._id })
			).then((data) => {
				if (data?.payload?.success) {
					toast({
						title: 'Cart item deleted successfully !',
					});
				}
			});
		}
	}

	function handleCartItemUpdate(updatedCartItem: CartItem, operation: string) {
		if (operation == 'plus') {
			const getCartItems = cart?.items || [];

			// get cart item details
			if (getCartItems.length) {
				const indexOfCurrentCartItem = getCartItems.findIndex(
					(item) => item._id === updatedCartItem?._id
				);

				// get product details
				const getCurrentProductIndex = productList.findIndex(
					(product) => product?._id === updatedCartItem?._id
				);

				const getTotalStock = productList[getCurrentProductIndex].totalStock;

				// compare user brought items vs total stock
				if (indexOfCurrentCartItem > -1) {
					const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
					if (getQuantity + 1 > getTotalStock) {
						toast({
							title: `Only ${getQuantity} quantity can be added for this item !`,
							variant: 'destructive',
						});

						return;
					}
				}
			}
		}

		if (user?.id) {
			dispatch(
				updateCartItemsQuantity({
					userId: user?.id,
					productId: updatedCartItem?._id,
					quantity:
						operation === 'minus'
							? updatedCartItem.quantity - 1
							: updatedCartItem.quantity + 1,
				})
			).then((data) => {
				if (data?.payload?.success) {
					toast({
						title: 'Cart item updated successfully !',
					});
				}
			});
		}
	}

	return (
		<div className="flex items-center space-x-4">
			{cartItem?.image ? (
				<Image
					src={cartItem.image}
					alt={cartItem.title || 'new product'}
					width={80}
					height={80}
					priority
					className="object-cover rounded-lg p-2"
					style={{ width: '80px', height: '80px', borderRadius: '16px' }}
				/>
			) : null}
			<div className="flex-1">
				<h3 className="font-extrabold">{cartItem?.title}</h3>
				<div className="flex items-center mt-1 gap-2">
					<Button
						onClick={() => handleCartItemUpdate(cartItem, 'minus')}
						className="h-8 w-8 rounded-full cursor-pointer"
						variant="outline"
						size="icon"
						disabled={cartItem.quantity === 1}
					>
						<Minus className="w-4 h-4" />
						<span className="sr-only">Decrease</span>
					</Button>
					<span className="font-semibold px-2">{cartItem?.quantity}</span>
					<Button
						onClick={() => handleCartItemUpdate(cartItem, 'plus')}
						className="h-8 w-8 rounded-full cursor-pointer"
						variant="outline"
						size="icon"
					>
						<Plus className="w-4 h-4" />
						<span className="sr-only">Increase</span>
					</Button>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<p className="font-semibold">
					{new Intl.NumberFormat('en-GB', {
						style: 'currency',
						currency: 'GBP',
					}).format(
						(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
							cartItem?.quantity
					)}
				</p>
				<Button
					className="h-8 w-8 rounded-full cursor-pointer"
					variant="outline"
					size="icon"
					onClick={() => handleCartItemDelete(cartItem)}
				>
					<Trash className="w-4 h-4">
						<span className="sr-only">Remove</span>
					</Trash>
				</Button>
			</div>
		</div>
	);
}

export default UserCartItemsContent;
