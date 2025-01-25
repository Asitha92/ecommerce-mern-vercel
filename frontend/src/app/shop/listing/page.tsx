'use client';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components';
import ProductFilter from '../filter';
import { ArrowUpDown } from 'lucide-react';
import { sortOptions } from '../config';
import { SortOption } from '../types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
	fetchAllFilteredProducts,
	fetchProductDetails,
} from '@/store/shop/productSlice';
import ShoppingProductTile from '@/components/common/ShoppingProductTile/ShoppingProductTile';
import { FormData } from './types';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductDetailDialog from '@/components/common/ProductDetailDialog/ProductDetailDialog';
import { addCartItems, fetchCartItems } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';

function ShoppingListing() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const { productList, productDetails } = useSelector(
		(state: RootState) => state.shopProducts
	);

	const { cart } = useSelector((state: RootState) => state.shopCart);
	const { user } = useSelector((state: RootState) => state.auth);

	const [filters, setFilters] = useState<Record<string, string[]>>({});
	const [sort, setSort] = useState<string>('price-lowToHigh');
	const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);
	const { toast } = useToast();
	const categorySearchParams = searchParams.get('category');

	function handleSort(value: string) {
		setSort(value);
	}

	function handleFilters(getSectionId: string, getCurrentOption: string) {
		let copyFilters = { ...filters };

		if (!copyFilters[getSectionId]) {
			// If the filter section doesn't exist, create it with the current option
			copyFilters = {
				...copyFilters,
				[getSectionId]: [getCurrentOption],
			};
		} else {
			const indexOfCurrentOption =
				copyFilters[getSectionId].indexOf(getCurrentOption);

			if (indexOfCurrentOption === -1) {
				// If the current option is not present, add it
				copyFilters[getSectionId].push(getCurrentOption);
			} else {
				// If the current option exists, remove it
				copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
				if (copyFilters[getSectionId].length === 0)
					delete copyFilters[getSectionId];
			}
		}
		setFilters(copyFilters);
		sessionStorage.setItem('filters', JSON.stringify(copyFilters));
	}

	function createSearchParamsHelper(
		filterParams: Record<string, string[]>
	): string {
		const queryParams = [];
		for (const [key, value] of Object.entries(filterParams)) {
			if (Array.isArray(value) && value.length > 0) {
				const paramValue = value.join(',');
				queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
			}
		}

		return queryParams.join('&');
	}

	function handleGetProductDetails(getCurrentId: string) {
		dispatch(fetchProductDetails(getCurrentId));
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

	useEffect(() => {
		const storedFilters = sessionStorage.getItem('filters');
		setFilters(storedFilters ? JSON.parse(storedFilters) : {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionStorage.getItem('filters'), categorySearchParams]);

	useEffect(() => {
		if (filters && Object.keys(filters).length > 0) {
			const queryString = createSearchParamsHelper(filters);
			const newParams = new URLSearchParams(queryString);

			// Push updated query parameters
			router.push(`?${newParams.toString()}`, undefined);
		}
	}, [filters, router]);

	useEffect(() => {
		if (sort !== null) {
			const controller = new AbortController();
			dispatch(
				fetchAllFilteredProducts({
					filterParams: filters,
					sortParams: sort,
					signal: controller.signal,
				})
			).then((data) => {
				console.log(data);
			});
			// Cancel the previous request when dependencies change
			return () => {
				controller.abort();
			};
		}
	}, [dispatch, sort, filters]);

	useEffect(() => {
		if (productDetails !== null) {
			setOpenDetailDialog(true);
		}
	}, [productDetails]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
			<ProductFilter
				filters={filters}
				handleFilters={handleFilters}
			/>
			<div className="bg-background w-full rounded-lg shadow-sm">
				<div className="p-4 border-b flex items-center justify-between">
					<h2 className="text-lg font-extrabold">All Products</h2>
					<div className="flex gap-3 items-center">
						<span className="text-muted-foreground">{`${productList.length} ${
							productList.length === 1 ? 'Product' : 'Products'
						}`}</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<ArrowUpDown className="h-4 w-4" />
									<span>Sort by</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-[200px]"
							>
								<DropdownMenuRadioGroup
									value={sort}
									onValueChange={handleSort}
								>
									{sortOptions.map((sortOption: SortOption) => {
										return (
											<DropdownMenuRadioItem
												key={sortOption.id}
												value={sortOption.id}
											>
												{sortOption.label}
											</DropdownMenuRadioItem>
										);
									})}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
					{productList && productList.length > 0
						? productList.map((productItem: FormData) => {
								return (
									<div key={productItem.title}>
										<ShoppingProductTile
											product={productItem}
											handleGetProductDetails={handleGetProductDetails}
											handleAddToCart={handleAddToCart}
										/>
									</div>
								);
						  })
						: null}
				</div>
			</div>
			<ProductDetailDialog
				open={openDetailDialog}
				setOpen={setOpenDetailDialog}
				product={productDetails}
			/>
		</div>
	);
}

export default ShoppingListing;
