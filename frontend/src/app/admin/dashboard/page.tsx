'use client';
import { addFeatureImage, getFeatureImages } from '@/store/commonSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductImageUpload from '../image-uploader';
import { DashboardImage } from './types';

function AdminDashboard() {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
	const [imageLoadingState, setImageLoadingState] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { featureImageList } = useSelector(
		(state: RootState) => state.commonFeature
	);

	function handleUploadFeatureImage() {
		if (uploadedImageUrl) {
			dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
				if (data?.payload?.success) {
					dispatch(getFeatureImages());
					setImageFile(null);
					setUploadedImageUrl(null);
				}
			});
		}
	}

	useEffect(() => {
		dispatch(getFeatureImages());
	}, [dispatch]);

	return (
		<div>
			<ProductImageUpload
				imageFile={imageFile}
				setImageFile={setImageFile}
				setUploadedImageUrl={setUploadedImageUrl}
				setImageLoadingState={setImageLoadingState}
				imageLoadingState={imageLoadingState}
				isCustomStyling={true}
				// isEditMode={currentEditedId !== null}
			/>
			<Button
				onClick={handleUploadFeatureImage}
				className="mt-5 w-full"
			>
				Upload
			</Button>
			<div className="flex flex-col gap-4 mt-5">
				{featureImageList && featureImageList.length > 0
					? featureImageList.map((featureImgItem: DashboardImage) => (
							<div
								key={featureImgItem._id}
								className="relative mb-2"
							>
								<Image
									src={featureImgItem.image}
									alt={'page images'}
									width={80}
									height={80}
									priority
									className="w-full h-[300px] object-cover rounded-lg"
								/>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}

export default AdminDashboard;
