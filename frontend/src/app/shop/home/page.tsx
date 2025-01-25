'use client';

import { bannerOne, bannerTwo, bannerThree } from '@/assets';
import { Button, Card, CardContent } from '@/components';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { brandsWithIcons, categoriesWithIcons, sortOptions } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
	fetchAllFilteredProducts,
	fetchProductDetails,
} from '@/store/shop/productSlice';
import { BrandItem, CategoryItem } from './types';
import { useRouter } from 'next/navigation';
import { SHOP_LISTING_URL } from '@/constants';
import ShoppingProductTile from '@/components/common/ShoppingProductTile/ShoppingProductTile';
import { addCartItems, fetchCartItems } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailDialog from '@/components/common/ProductDetailDialog/ProductDetailDialog';
import { getFeatureImages } from '@/store/commonSlice';

function ShoppingHome() {
	const slides = [bannerOne, bannerTwo, bannerThree];
	const { productList, productDetails } = useSelector(
		(state: RootState) => state.shopProducts
	);
	const { user } = useSelector((state: RootState) => state.auth);
	// const { featureImageList } = useSelector(
	// 	(state: RootState) => state.commonFeature
	// );

	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [openDetailDialog, setOpenDetailDialog] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { toast } = useToast();

	function handleNavigateToListingPage(
		currentItem: CategoryItem,
		section: string
	) {
		sessionStorage.removeItem('filters');
		const currentFilter = {
			[section]: [currentItem.id],
		};

		sessionStorage.setItem('filters', JSON.stringify(currentFilter));
		router.push(SHOP_LISTING_URL);
	}

	function handleGetProductDetails(getCurrentId: string) {
		dispatch(fetchProductDetails(getCurrentId));
	}

	function handleAddToCart(currentProductId: string) {
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
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [slides.length]);

	useEffect(() => {
		const controller = new AbortController();
		dispatch(
			fetchAllFilteredProducts({
				filterParams: {},
				sortParams: sortOptions[0].id,
				signal: controller.signal,
			})
		);

		// Cancel the previous request when dependencies change
		return () => {
			controller.abort();
		};
	}, [dispatch]);

	useEffect(() => {
		if (productDetails !== null) {
			setOpenDetailDialog(true);
		}
	}, [productDetails]);

	useEffect(() => {
		dispatch(getFeatureImages());
	}, [dispatch]);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="relative w-full h-[600px] overflow-hidden">
				{slides.map((slide, index) => {
					return (
						<Image
							key={index}
							src={slide}
							alt={`Home-Banner-${index}`}
							priority
							className={`${
								index === currentSlide ? 'opacity-100' : 'opacity-0'
							} object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-1000`}
						/>
					);
				})}
				{/* commented due to low quality of uploaded images */}
				{/* {featureImageList && featureImageList.length > 0
					? featureImageList.map((slide: HomePageImage, index: number) => {
							return (
								<Image
									key={slide?._id}
									src={slide?.image}
									width={80}
									height={60}
									alt={`Home-Banner-${slide?._id}`}
									priority
									className={`${
										index === currentSlide ? 'opacity-100' : 'opacity-0'
									} object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-1000`}
								/>
							);
					  })
					: null} */}
				<Button
					variant="outline"
					size="icon"
					className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/40"
					onClick={() =>
						setCurrentSlide(
							(prev) => (prev - 1 + slides.length) % slides.length
						)
					}
				>
					<ChevronLeftIcon className="w-4 h-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/40"
					onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
				>
					<ChevronRightIcon className="w-4 h-4" />
				</Button>
			</div>
			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-8">
						Shop by category
					</h2>
					{/* todo: change cols dynamically when more brands added */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{categoriesWithIcons.map((categoryItem: CategoryItem) => {
							return (
								<Card
									key={categoryItem.id}
									className="cursor-pointer hover:shadow-lg transition-shadow"
									onClick={() =>
										handleNavigateToListingPage(categoryItem, 'category')
									}
								>
									<CardContent className="flex flex-col items-center justify-center p-6">
										<categoryItem.icon className="w-12 h-12 text-primary" />
										<span className="font-bold">{categoryItem.label}</span>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
					{/* todo: change cols dynamically when more brands added */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
						{brandsWithIcons.map((brandItem: BrandItem) => {
							return (
								<Card
									key={brandItem.id}
									className="cursor-pointer hover:shadow-lg transition-shadow"
									onClick={() =>
										handleNavigateToListingPage(brandItem, 'brand')
									}
								>
									<CardContent className="flex flex-col items-center justify-center p-6">
										<brandItem.icon className="w-12 h-12 text-primary" />
										<span className="font-bold">{brandItem.label}</span>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-8">
						Featured Products
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:gris-cols-3 lg:grid-cols-4 gap-6">
						{productList && productList.length > 0
							? productList.map((product: Record<string, string>) => (
									<div key={product.title}>
										<ShoppingProductTile
											product={product}
											handleGetProductDetails={handleGetProductDetails}
											handleAddToCart={handleAddToCart}
										/>
									</div>
							  ))
							: null}
					</div>
				</div>
			</section>
			<ProductDetailDialog
				open={openDetailDialog}
				setOpen={setOpenDetailDialog}
				product={productDetails}
			/>
		</div>
	);
}

export default ShoppingHome;
