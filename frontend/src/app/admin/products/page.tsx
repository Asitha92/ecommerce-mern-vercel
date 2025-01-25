'use client';
import CommonForm from '@/components/common/form/form';
import {
	Button,
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components';
import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import { addProductFormElements } from './config';
import { FormData } from '@/components/common/form/types';
import ProductImageUploader from '../image-uploader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
	addNewProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
} from '@/store/admin/productSlice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/common/AdminProductTile/AdminProductTile';

const initialFormData = {
	_id: '',
	image: '',
	title: '',
	description: '',
	category: '',
	brand: '',
	price: '',
	salePrice: '',
	totalStock: '',
};

function AdminProducts() {
	const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
	const [formData, setFormData] = useState<FormData | null>(initialFormData);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImage, setUploadedImage] = useState<string>('');
	const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);
	const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

	const dispatch = useDispatch<AppDispatch>();
	const { productList } = useSelector(
		(state: RootState) => state.adminProducts
	);

	const { toast } = useToast();

	function updateProduct() {
		if (currentEditedId)
			if (formData)
				dispatch(editProduct({ _id: currentEditedId, formData })).then(
					(data) => {
						if (data?.payload?.success) {
							dispatch(fetchAllProducts());
							setFormData(initialFormData);
							setOpenCreateProductDialog(false);
							setCurrentEditedId(null);
						}
					}
				);
	}

	function handleDeleteProduct(getCurrentProductId: string): void {
		if (getCurrentProductId) {
			dispatch(deleteProduct(getCurrentProductId)).then((data) => {
				if (data?.payload?.success) {
					dispatch(fetchAllProducts());
					setCurrentEditedId(null);
				}
			});
		}
	}

	function createProduct() {
		dispatch(
			addNewProduct({
				...formData,
				image: uploadedImage,
			})
		).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts());
				setOpenCreateProductDialog(false);
				setImageFile(null);
				setFormData(initialFormData);
				toast({
					title: 'Product Added Successfully !',
				});
			}
		});
	}

	function onSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		if (currentEditedId) {
			updateProduct();
		} else {
			createProduct();
		}
	}

	function handleProductFormOpen(): void {
		setOpenCreateProductDialog(false);
		setCurrentEditedId(null);
		setFormData(initialFormData);
	}

	function isFormValid() {
		if (formData)
			return Object.keys(formData)
				.map((key) => formData[key] !== '')
				.every((item) => item);
	}

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<Fragment>
			<div className="mb-5 w-full flex justify-end">
				<Button onClick={() => setOpenCreateProductDialog(true)}>
					Add New Product
				</Button>
			</div>
			{productList.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
					{productList.map((product: Record<string, string>) => {
						return (
							<div key={product.title}>
								<AdminProductTile
									setCurrentEditedId={setCurrentEditedId}
									setOpenCreateProductDialog={setOpenCreateProductDialog}
									product={product}
									setFormData={setFormData}
									handleDeleteProduct={handleDeleteProduct}
								/>
							</div>
						);
					})}
				</div>
			) : null}
			<Sheet
				open={openCreateProductDialog}
				onOpenChange={() => handleProductFormOpen()}
			>
				<SheetContent
					aria-describedby={undefined}
					className="overflow-auto"
					side="right"
				>
					<SheetHeader>
						<SheetTitle>
							{currentEditedId ? 'Edit Product' : 'Add New Product'}
						</SheetTitle>
					</SheetHeader>
					<ProductImageUploader
						imageFile={imageFile}
						setImageFile={setImageFile}
						setUploadedImageUrl={setUploadedImage}
						setImageLoadingState={setImageLoadingState}
						imageLoadingState={imageLoadingState}
						currentEditedId={currentEditedId}
					/>
					<div className="py-6">
						<CommonForm
							formData={formData}
							setFormData={setFormData}
							formControls={addProductFormElements}
							buttonText={`${currentEditedId ? 'Edit' : 'Add'}`}
							onSubmit={onSubmit}
							isButtonDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	);
}

export default AdminProducts;
