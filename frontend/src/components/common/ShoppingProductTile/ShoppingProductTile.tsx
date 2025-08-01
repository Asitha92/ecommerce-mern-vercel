import { Card, CardContent, CardFooter, Button, Badge } from '@/components';
import React from 'react';
import { ShoppingProductTileProps } from './types';
import Image from 'next/image';
import { brandOptionMap, categoryOptionMap } from '../../../app/shop/config';

function ShoppingProductTile({
	product,
	handleGetProductDetails,
	handleAddToCart,
}: ShoppingProductTileProps) {
	const { _id, brand, category, image, price, salePrice, title, totalStock } =
		product;

	return (
		<Card className="w-full max-w-sm mx-auto cursor-pointer">
			<div onClick={() => _id && handleGetProductDetails(_id)}>
				<div className="relative">
					{image ? (
						<Image
							src={image}
							alt={title || 'new product'}
							width={350}
							height={350}
							priority
							className="object-cover rounded-t-lg p-2 aspect-auto"
							style={{ width: '100%', height: '350px', overflow: 'auto' }}
						/>
					) : null}
					{Number(totalStock) === 0 ? (
						<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
							Out Of Stock
						</Badge>
					) : Number(totalStock) < 10 ? (
						<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
							{`Only ${totalStock} items left`}
						</Badge>
					) : salePrice && Number(salePrice) > 0 ? (
						<Badge className="absolute top-1 right-2 bg-red-500 hover:bg-red-600">
							Sale
						</Badge>
					) : null}
				</div>
				<CardContent className="p-4">
					<h2 className="text-xl font-bold mb-2 line-clamp-2">{title}</h2>
					<div className="flex justify-between items-center mb-2">
						<p className="text-sm text-gray-600 font-semibold">
							Brand:{' '}
							{brand && brandOptionMap[brand as keyof typeof brandOptionMap]}
						</p>
						<p className="text-sm text-gray-600 font-semibold">
							Category:{' '}
							{category &&
								categoryOptionMap[category as keyof typeof categoryOptionMap]}
						</p>
					</div>
					<div className="flex justify-between items-center mb-2">
						{price ? (
							<span
								className={`text-xl font-bold mb-2 ${
									salePrice &&
									Number(salePrice) > 0 &&
									Number(salePrice) > Number(price)
										? 'line-through'
										: ''
								}`}
							>
								{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(Number(price))}
							</span>
						) : null}
						{salePrice && Number(salePrice) > Number(price) ? (
							<span className="text-lg font-bold">
								{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(Number(salePrice))}
							</span>
						) : null}
					</div>
					<div>
						<p className="text-sm text-gray-600 font-semibold mt-2">
							Total Stock: {totalStock}
						</p>
					</div>
				</CardContent>
			</div>
			<CardFooter>
				{Number(totalStock) === 0 ? (
					<Button className="w-full opacity-60 cursor-not-allowed">
						Out of Stock
					</Button>
				) : (
					<Button
						onClick={() =>
							_id && totalStock && handleAddToCart(_id, totalStock)
						}
						className="w-full"
					>
						Add to cart
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}

export default ShoppingProductTile;
