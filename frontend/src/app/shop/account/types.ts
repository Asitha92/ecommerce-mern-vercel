import { FormControlProps } from '@/components/common/form/formConfig';

export type FormData = Record<string, string | null>;

export type FormProps = {
	buttonText: string;
	formControls: FormControlProps[];
	formData: FormData;
	isButtonDisabled?: boolean;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export type AddressData = Record<string, string | null> | null;

export type AddressProps = {
	selectedAddressId?: string | null;
	handleCurrentAddress?: (currentAddress: AddressData) => void;
};

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
