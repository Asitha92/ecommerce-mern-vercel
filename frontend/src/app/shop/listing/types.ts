export type FormData = Record<string, string | null>;

export type ProductProps = {
	id: number;
	image: string;
	title: string;
	description: string;
	price: number;
	category: string;
	brand: string;
	salePrice: number;
	totalStock: number;
};

export type AddToCartItemProps = {
	id: string;
	productId: string;
	quantity: number;
};
