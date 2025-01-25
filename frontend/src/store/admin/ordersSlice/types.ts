export type Order = {
	_id: string;
	orderDate: string;
	orderStatus: string;
	totalAmount: number;
};

type CartItem = {
	salePrice: number;
	price: number;
	title: string;
	image: string;
	productId: string;
	quantity: number;
	_id: string;
};

export type OrderDetailsProps = {
	_id: string;
	orderDate: string;
	totalAmount: number;
	paymentMethod: string;
	paymentStatus: string;
	orderStatus: string;
	cartItems: CartItem[];
	addressInfo: Record<string, string>;
};

export type InitialState = {
	orderList: Order[] | [];
	isLoading: boolean;
	orderDetails: OrderDetailsProps | null;
};

export type UpdateOrderStatusProps = {
	id: string;
	orderStatus: string;
};
