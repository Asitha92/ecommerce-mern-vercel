export type EditAddressParams = {
	userId: string;
	addressId: string;
	formData: Record<string, string>;
};

export type DeleteAddressParams = {
	userId: string;
	addressId: string;
};
