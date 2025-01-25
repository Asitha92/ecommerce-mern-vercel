'use client';
import { useRef, DragEvent, ChangeEvent, useEffect, Fragment } from 'react';
import { ImageUploaderProps } from './types';
import { Button, Input, Skeleton } from '@/components';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function ProductImageUploader({
	imageFile,
	imageLoadingState,
	setImageFile,
	setImageLoadingState,
	setUploadedImageUrl,
	currentEditedId,
	isCustomStyling = false,
}: ImageUploaderProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleImageFileChange(event: ChangeEvent<HTMLInputElement>) {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setImageFile(selectedFile);
		}
	}

	function handleDragOver(event: DragEvent<HTMLDivElement>) {
		event?.preventDefault();
	}

	function handleDrop(event: DragEvent<HTMLInputElement>) {
		event?.preventDefault();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) {
			setImageFile(droppedFile);
		}
	}

	function handleRemoveImage() {
		setImageFile(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}

	async function uploadImageToCloudinary() {
		setImageLoadingState(true);

		if (!imageFile) {
			setImageLoadingState(false);
			return;
		}

		const data = new FormData();
		data.append('my-file', imageFile);

		try {
			const response = await axios.post(
				`${API_BASE_URL}/api/admin/products/upload-image`,
				data
			);

			if (response.data?.success) {
				setUploadedImageUrl(response.data.result.url);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setImageLoadingState(false);
		}
	}

	useEffect(() => {
		if (imageFile !== null) {
			uploadImageToCloudinary();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageFile]);

	return (
		<div
			className={`w-full  mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}
		>
			{!currentEditedId ? (
				<Fragment>
					<label className="text-lg font-semibold mb-2 block">
						Image Upload
					</label>
					<div
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						className="border-2 border-dashed rounded-lg p-4 mt-4"
					>
						<Input
							className="hidden"
							id="image-upload"
							onChange={handleImageFileChange}
							ref={inputRef}
							type="file"
						/>
						{!imageFile ? (
							<label
								className="flex flex-col items-center justify-center h-32 cursor-pointer"
								htmlFor="image-upload"
							>
								<UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
								<span>Drag & drop or click to upload image</span>
							</label>
						) : imageLoadingState ? (
							<Skeleton className="h-10 bg-gray-100" />
						) : (
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FileIcon className="w-8 h-8 text-primary mr-2" />
								</div>
								<p className="text-sm font-medium">{imageFile.name}</p>
								<Button
									className="text-muted-foreground hover:text-foreground"
									onClick={handleRemoveImage}
									variant={'ghost'}
								>
									<XIcon className="w-4 h-4" />
									<span className="sr-only">Remove file</span>
								</Button>
							</div>
						)}
					</div>
				</Fragment>
			) : null}
		</div>
	);
}

export default ProductImageUploader;
