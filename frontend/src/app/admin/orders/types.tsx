export type FormData = Record<string, string>;

export type OrderItem = {
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

export type OrderDetails = {
	_id: string;
	orderDate: string;
	totalAmount: number;
	paymentMethod: string;
	paymentStatus: string;
	orderStatus: string;
	cartItems: CartItem[];
	addressInfo: Record<string, string>;
};

export type OrderDetailsProps = {
	orderDetails: OrderDetails | null;
};
