'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import CommonForm from '@/components/common/form/form';
import React, { useEffect, useState } from 'react';
import { addressFormElements } from './config';
import { AddressProps, FormData } from './types';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewAddress,
	deleteAddress,
	editAddress,
	fetchAllAddresses,
} from '@/store/shop/addressSlice';
import { useToast } from '@/hooks/use-toast';
import AddressCard from '@/components/common/AddressCard/AddressCard';

const initialAddressFormData: FormData = {
	address: '',
	city: '',
	phone: '',
	zipCode: '',
	notes: '',
};

function Address({ handleCurrentAddress, selectedAddressId }: AddressProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { toast } = useToast();
	const { user } = useSelector((state: RootState) => state.auth);
	const { addressList } = useSelector((state: RootState) => state.shopAddress);

	const [formData, setFormData] = useState<FormData | null>(
		initialAddressFormData
	);
	const [currentEditedAddressId, setCurrentEditedAddressId] = useState<
		string | null
	>(null);

	const handleManageAddress = (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		if (
			addressList &&
			addressList.length > 2 &&
			currentEditedAddressId === null
		) {
			setFormData(initialAddressFormData);
			toast({
				title: 'You can add only 3 addresses.',
				variant: 'destructive',
			});

			return;
		}

		if (currentEditedAddressId !== null) {
			if (user?.id && formData)
				dispatch(
					editAddress({
						userId: user?.id,
						addressId: currentEditedAddressId,
						formData: formData,
					})
				).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllAddresses(user?.id));
						setCurrentEditedAddressId(null);
						setFormData(initialAddressFormData);
						toast({
							title: data?.payload?.message,
						});
					}
				});
		} else {
			if (user?.id) {
				dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
					(data) => {
						if (data?.payload?.success) {
							dispatch(fetchAllAddresses(user?.id));
							toast({
								title: data?.payload?.message,
							});
							setFormData(initialAddressFormData);
						}
					}
				);
			}
		}
	};

	function isFormValid() {
		return (
			formData && Object.values(formData).every((value) => value?.trim() !== '')
		);
	}
	function handleEditAddress(addressInfo: FormData) {
		setCurrentEditedAddressId(addressInfo._id);
		setFormData({
			...formData,
			address: addressInfo.address,
			city: addressInfo.city,
			phone: addressInfo.phone,
			zipCode: addressInfo.zipCode,
			notes: addressInfo.notes,
		});
	}

	function handleDeleteAddress(addressInfo: FormData) {
		if (user?.id)
			dispatch(
				deleteAddress({ userId: user?.id, addressId: addressInfo._id || '' })
			).then((data) => {
				if (data?.payload?.success) {
					dispatch(fetchAllAddresses(user?.id));
					toast({
						title: data?.payload?.message,
					});
				}
			});
	}

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchAllAddresses(user?.id));
		}
	}, [dispatch, user?.id]);

	return (
		<Card>
			<div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
				{addressList && addressList.length > 0
					? addressList.map((addressItem, index) => {
							return (
								<div key={index}>
									<AddressCard
										selectedAddressId={selectedAddressId}
										addressInfo={addressItem}
										handleEditAddress={handleEditAddress}
										handleDeleteAddress={handleDeleteAddress}
										handleCurrentAddress={handleCurrentAddress}
									/>
								</div>
							);
					  })
					: null}
			</div>
			<CardHeader>
				<CardTitle>
					{currentEditedAddressId !== null ? 'Edit Address' : 'Add New Address'}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<CommonForm
					formControls={addressFormElements}
					formData={formData}
					setFormData={setFormData}
					buttonText={
						currentEditedAddressId !== null ? 'Edit Address' : 'Add Address'
					}
					onSubmit={(e) => handleManageAddress(e)}
					isButtonDisabled={!isFormValid()}
				/>
			</CardContent>
		</Card>
	);
}

export default Address;
