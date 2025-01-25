export type FormData = Record<string, string>;

export type AddressData = Record<string, string | null>;

export type AddressInfo = {
	addressInfo: FormData;
	selectedAddressId?: string | null;
	handleEditAddress: (addressInfo: FormData) => void;
	handleDeleteAddress: (addressInfo: FormData) => void;
	handleCurrentAddress?: (addressInfo: FormData) => void;
};
