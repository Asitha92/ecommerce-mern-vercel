export type FormData = Record<string, string>;

export type AdminProductTileProps = {
	product: FormData;
	setCurrentEditedId: (id: string) => void;
	setOpenCreateProductDialog: (open: boolean) => void;
	setFormData: (data: FormData) => void;
	handleDeleteProduct: (id: string) => void;
};
