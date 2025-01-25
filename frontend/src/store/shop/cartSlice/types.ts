export type AddToCartItemsParams = {
	productId: string;
	quantity: number;
	userId?: string;
};

export type DeleteCartItemsParams = {
	productId: string;
	userId: string;
};

export type CartItem = {
	_id: string;
	image: string;
	price: number;
	productId: string;
	quantity: number;
	salePrice: number;
	title: string;
};

export type Cart = {
	_id: string;
	createdAt: string;
	items: CartItem[];
	updatedAt: string;
	userId: string;
};

export type InitialStateProps = {
	cart: Cart | null;
	isLoading: boolean;
};
