import { Dispatch, SetStateAction } from 'react';

export type AdminViewLayoutProps = {
	children: React.ReactNode;
};

export type SidebarItem = {
	icon: React.ReactNode;
	id: string;
	label: string;
	path: string;
};

export type ImageUploaderProps = {
	imageFile: File | null;
	setImageFile: (file: File | null) => void;
	setUploadedImageUrl: (url: string) => void;
	setImageLoadingState: (isLoading: boolean) => void;
	imageLoadingState: boolean;
	currentEditedId?: string | null;
	isCustomStyling?: boolean;
};

export interface AdminSideBarProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AdminHeaderProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
