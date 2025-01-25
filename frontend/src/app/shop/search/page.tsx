'use client';

import { Input } from '@/components';
import ProductDetailDialog from '@/components/common/ProductDetailDialog/ProductDetailDialog';
import ShoppingProductTile from '@/components/common/ShoppingProductTile/ShoppingProductTile';
import { useToast } from '@/hooks/use-toast';
import { addCartItems, fetchCartItems } from '@/store/shop/cartSlice';
import { fetchProductDetails } from '@/store/shop/productSlice';
import { getSearchResults, resetSearchResults } from '@/store/shop/searchSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SearchProducts() {
	const [keyword, setKeyword] = useState<string>('');
	const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const searchParams = useSearchParams();
	const { searchResults } = useSelector((state: RootState) => state.shopSearch);
	const { productDetails } = useSelector(
		(state: RootState) => state.shopProducts
	);

	const { user } = useSelector((state: RootState) => state.auth);

	const { cart } = useSelector((state: RootState) => state.shopCart);
	const { toast } = useToast();
	useEffect(() => {
		const handleSearch = () => {
			const trimmedKeyword = keyword?.trim();
			const currentParams = new URLSearchParams(searchParams.toString());

			if (trimmedKeyword) {
				currentParams.set('keyword', trimmedKeyword);
				router.push(`?${currentParams.toString()}`);
				dispatch(getSearchResults(trimmedKeyword));
			} else {
				// Remove the keyword if it doesn't meet criteria
				currentParams.delete('keyword');
				router.push(`?${currentParams.toString()}`);
				dispatch(resetSearchResults());
			}
		};

		// Add a delay to prevent spamming
		const debounce = setTimeout(handleSearch, 1000);

		// Cleanup timeout on unmount or dependency change
		return () => clearTimeout(debounce);
	}, [keyword, router, searchParams, dispatch]);

	function handleAddToCart(getCurrentProductId: string, getTotalStock: string) {
		let getCartItems = cart?.items || [];

		if (getCartItems.length) {
			const indexOfCurrentItem = getCartItems.findIndex(
				(item) => item._id === getCurrentProductId
			);
			if (indexOfCurrentItem > -1) {
				const getQuantity = getCartItems[indexOfCurrentItem].quantity;
				if (getQuantity + 1 > Number(getTotalStock)) {
					toast({
						title: `Only ${getQuantity} quantity can be added for this item`,
						variant: 'destructive',
					});

					return;
				}
			}
		}

		dispatch(
			addCartItems({
				userId: user?.id,
				productId: getCurrentProductId,
				quantity: 1,
			})
		).then((data) => {
			if (data?.payload?.success) {
				user?.id && dispatch(fetchCartItems(user?.id));
				toast({
					title: 'Product is added to cart',
				});
			}
		});
	}

	function handleGetProductDetails(getCurrentProductId: string) {
		dispatch(fetchProductDetails(getCurrentProductId));
	}

	useEffect(() => {
		if (productDetails !== null) setOpenDetailsDialog(true);
	}, [productDetails]);

	return (
		<div className="container mx-auto md:px-6 px-4 py-8">
			<div className="flex justify-center mb-8">
				<div className="w-full flex items-center">
					<Input
						value={keyword}
						name="keyword"
						onChange={(event) => setKeyword(event.target.value)}
						className="py-6"
						placeholder="Search Products..."
					/>
				</div>
			</div>
			{!searchResults.length ? (
				<h1 className="text-2xl font-extrabold">No result found!</h1>
			) : null}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				{searchResults.map((item: Record<string, string>) => (
					<Fragment key={item?.title}>
						<ShoppingProductTile
							handleAddToCart={handleAddToCart}
							product={item}
							handleGetProductDetails={handleGetProductDetails}
						/>
					</Fragment>
				))}
			</div>
			<ProductDetailDialog
				open={openDetailsDialog}
				setOpen={setOpenDetailsDialog}
				product={productDetails}
			/>
		</div>
	);
}

export default SearchProducts;
