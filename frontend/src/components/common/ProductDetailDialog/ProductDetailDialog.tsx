'use client';
import {
	Avatar,
	Button,
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTitle,
	Input,
	Label,
	Separator,
} from '@/components';
import { ProductDetailDialogProps } from './types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { addCartItems, fetchCartItems } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';
import { setProductDetails } from '@/store/shop/productSlice';
import RatingCommentsComponent from '../Ratings/RatingsComments';
import { addReview, getReviews } from '@/store/shop/reviewSlice';
import Ratings from '../Ratings/Ratings';

function ProductDetailDialog({
	open,
	setOpen,
	product,
}: ProductDetailDialogProps) {
	const { cart } = useSelector((state: RootState) => state.shopCart);
	const { user } = useSelector((state: RootState) => state.auth);
	const { reviews } = useSelector((state: RootState) => state.shopReview);

	const [reviewMsg, setReviewMsg] = useState<string>('');
	const [rating, setRating] = useState<number>(0);

	const dispatch = useDispatch<AppDispatch>();
	const { toast } = useToast();

	function handleRatingChange(getRating: number) {
		setRating(getRating);
	}

	function handleAddReview() {
		if (product) {
			dispatch(
				addReview({
					productId: product?._id,
					userId: user?.id,
					userName: user?.userName,
					reviewMessage: reviewMsg,
					reviewValue: rating,
				})
			).then((data) => {
				if (data.payload.success) {
					setRating(0);
					setReviewMsg('');
					if (product?._id) dispatch(getReviews(product?._id));
					toast({
						title: 'Review added successfully !',
					});
				} else {
					toast({
						title: data.payload.message,
					});
				}
			});
		}
	}

	function handleAddToCart(currentProductId: string, totalStock: string) {
		const getCartItems = cart?.items || [];

		if (getCartItems.length) {
			const indexOfCurrentItem = getCartItems.findIndex(
				(item) => item._id === currentProductId
			);
			if (indexOfCurrentItem > -1) {
				const getQuantity = getCartItems[indexOfCurrentItem].quantity;
				if (getQuantity + 1 > Number(totalStock)) {
					toast({
						title: `Only ${getQuantity} quantity can be added for this item`,
						variant: 'destructive',
					});

					return;
				}
			}
		}
		if (user?.id) {
			dispatch(
				addCartItems({
					userId: user?.id,
					productId: currentProductId,
					quantity: 1,
				})
			).then((data) => {
				if (data?.payload?.success) {
					dispatch(fetchCartItems(user.id));
					toast({
						title: 'Product added to cart successfully !',
					});
				}
			});
		}
	}

	function handleDialogClose() {
		setOpen(false);
		dispatch(setProductDetails());
		setRating(0);
		setReviewMsg('');
	}

	const averageReview =
		reviews && reviews.length > 0
			? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
			  reviews.length
			: 0;

	useEffect(() => {
		if (product !== null && product?._id) dispatch(getReviews(product?._id));
	}, [dispatch, product]);

	return (
		<Dialog
			open={open}
			onOpenChange={handleDialogClose}
		>
			<DialogOverlay className="backdrop-blur-sm" />
			<DialogContent
				className="lg:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] lg:max-w-[70vw] max-h-screen overflow-y-auto h-fit rounded-lg"
				aria-describedby={undefined}
			>
				<div className="relative overflow-hidden rounded-lg">
					{product?.image ? (
						<Image
							src={product?.image}
							alt={product?.title || 'new product'}
							width={350}
							height={300}
							priority
							className="object-cover rounded-lg aspect-auto"
							style={{ width: '100%', borderRadius: '8px' }}
						/>
					) : null}
				</div>
				<div className="">
					<div>
						<DialogTitle>
							<span className="text-3xl font-extrabold">{product?.title}</span>
						</DialogTitle>

						<p className="text-muted-foreground mb-5 max-h-[150px] overflow-auto">
							{product?.description}
						</p>
					</div>
					<div className="flex items-center justify-between">
						{product?.price ? (
							<span
								className={`text-lg font-bold ${
									product?.salePrice && Number(product?.salePrice) > 0
										? 'line-through'
										: ''
								}`}
							>
								{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(Number(product?.price))}
							</span>
						) : null}
						{product?.salePrice ? (
							<span className="text-lg font-bold">
								{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(Number(product?.salePrice))}
							</span>
						) : null}
					</div>
					<div className="flex items-center gap-2 mt-2">
						<div className="flex items-center gap-0.5">
							<Ratings rating={averageReview} />
						</div>
						<span className="text-muted-foreground">
							({averageReview.toFixed(2)})
						</span>
					</div>
					<div className="mt-5 mb-5">
						{product && Number(product.totalStock) === 0 ? (
							<Button className="w-full opacity-60 cursor-not-allowed">
								Out of Stock
							</Button>
						) : (
							<Button
								className="w-full"
								onClick={() =>
									product?._id &&
									product?.totalStock &&
									handleAddToCart(product?._id, product?.totalStock)
								}
							>
								Add to Cart
							</Button>
						)}
					</div>
					<Separator />
					<div className="max-h-[300px] overflow-auto">
						<h2 className="text-xl font-bold mb-2 mt-3 px-1">Reviews</h2>
						<div className="grid gap-6">
							{reviews && reviews.length > 0 ? (
								reviews.map((reviewItem, index) => (
									<div
										key={index}
										className="flex gap-4"
									>
										<Avatar className="w-10 h-10 flex border bg-slate-300">
											<AvatarFallback className="flex w-full items-center justify-center">
												{reviewItem?.userName
													? reviewItem?.userName[0].toUpperCase()
													: '?'}
											</AvatarFallback>
										</Avatar>
										<div className="grid gap-1">
											<div className="flex items-center gap-2">
												<h3 className="font-bold">{reviewItem?.userName}</h3>
											</div>
											<div className="flex items-center gap-0.5">
												<Ratings rating={reviewItem?.reviewValue} />
											</div>
											<p className="text-muted-foreground">
												{reviewItem.reviewMessage}
											</p>
										</div>
									</div>
								))
							) : (
								<h1 className="px-1">No Reviews</h1>
							)}
						</div>
						<div className="mt-5 flex-col flex gap-2 px-1">
							<Label>Write a review</Label>
							<div className="flex gap-1">
								<RatingCommentsComponent
									rating={rating}
									handleRatingChange={handleRatingChange}
								/>
							</div>
							<Input
								name="reviewMsg"
								value={reviewMsg}
								onChange={(event) => setReviewMsg(event.target.value)}
								placeholder="Write a review..."
							/>
							<Button
								onClick={handleAddReview}
								disabled={reviewMsg.trim() === ''}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ProductDetailDialog;
