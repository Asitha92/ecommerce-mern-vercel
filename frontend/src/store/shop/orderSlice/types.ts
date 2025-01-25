export type CartItem = {
	_id: string;
	image: string;
	price: number;
	productId: string;
	quantity: number;
	salePrice: number;
	title: string;
};

export type OrderDataProps = Record<string, unknown>;

export type CapturePaymentProps = {
	paymentId: string;
	PayerID: string;
	orderId: string;
};
