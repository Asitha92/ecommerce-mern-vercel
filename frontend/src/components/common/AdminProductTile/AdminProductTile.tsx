import { Card, CardContent, CardFooter, Button } from '@/components';
import React from 'react';
import { AdminProductTileProps } from './types';
import Image from 'next/image';

function AdminProductTile({
	handleDeleteProduct,
	product,
	setCurrentEditedId,
	setFormData,
	setOpenCreateProductDialog,
}: AdminProductTileProps) {
	const {
		_id,
		brand,
		category,
		description,
		image,
		price,
		salePrice,
		title,
		totalStock,
	} = product;

	function handleEditProduct(): void {
		setOpenCreateProductDialog(true);
		if (_id) setCurrentEditedId(_id);
		setFormData(product);
	}

	return (
		<Card className="w-full max-w-sm mx-auto">
			<div>
				<div className="relative">
					{image ? (
						<Image
							src={image}
							alt={title || 'new product'}
							width={350}
							height={300}
							priority
							className="object-cover rounded-t-lg p-2 aspect-auto"
							style={{ width: '100%', height: '350px', overflow: 'auto' }}
						/>
					) : null}
				</div>
				<CardContent>
					<h2 className="text-xl font-bold mb-2 line-clamp-2">{title}</h2>
					<div className="flex justify-between items-center mb-2">
						{price ? (
							<span
								className={`text-lg font-semibold text-primary ${
									salePrice && Number(salePrice) > 0 ? 'line-through' : ''
								}`}
							>
								{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(Number(price))}
							</span>
						) : null}
						{salePrice ? (
							<span className="text-lg font-bold">
								{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(Number(salePrice))}
							</span>
						) : null}
					</div>
					<div>
						<p className="text-sm text-gray-600 max-h-[200px] overflow-auto">
							{description}
						</p>
						<div className="flex justify-between mt-2">
							<p className="text-sm text-gray-600 font-semibold">
								Brand: {brand}
							</p>
							<p className="text-sm text-gray-600 font-semibold">
								Category: {category}
							</p>
						</div>
						<p className="text-sm text-gray-600 font-semibold mt-2">
							Total Stock: {totalStock}
						</p>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center">
					<Button onClick={handleEditProduct}>Edit</Button>
					<Button onClick={() => _id && handleDeleteProduct(_id)}>
						Delete
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}

export default AdminProductTile;
