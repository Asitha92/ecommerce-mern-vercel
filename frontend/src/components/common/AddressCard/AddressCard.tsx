'use client';
import { Button, Card, CardContent, CardFooter } from '@/components';
import React from 'react';
import { AddressInfo } from './types';

function DetailLine(label: string, value: string) {
	return (
		<div className="flex text-sm font-medium">
			<div className="w-[100px]">{label} :</div>
			<div
				className="max-w-[200px] lg:max-w-[250px] truncate hover:text-clip"
				title={value}
			>
				{value}
			</div>
		</div>
	);
}

function AddressCard({
	selectedAddressId,
	addressInfo,
	handleEditAddress,
	handleDeleteAddress,
	handleCurrentAddress,
}: AddressInfo) {
	return (
		<Card
			onClick={() => handleCurrentAddress && handleCurrentAddress(addressInfo)}
			className={`cursor-pointer ${
				selectedAddressId === addressInfo._id ? 'bg-gray-300' : ''
			}`}
		>
			<CardContent className="grid p-4 gap-4">
				{DetailLine('Address', addressInfo?.address)}
				{DetailLine('City', addressInfo?.city)}
				{DetailLine('Phone', addressInfo?.phone)}
				{DetailLine('Zip Code', addressInfo?.zipCode)}
				{DetailLine('Notes', addressInfo?.notes)}
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button
					className="mx-3"
					size="sm"
					onClick={() => handleEditAddress(addressInfo)}
				>
					Edit
				</Button>
				<Button
					className="bg-red-600 hover:bg-red-400"
					size="sm"
					onClick={() => handleDeleteAddress(addressInfo)}
				>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}

export default AddressCard;
