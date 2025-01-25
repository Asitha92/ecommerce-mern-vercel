export type FormData = Record<string, string | null>;

export type ShoppingProductTileProps = {
	product: FormData;
	handleGetProductDetails: (id: string) => void;
	handleAddToCart: (currentProductId: string, totalStock: string) => void;
};
