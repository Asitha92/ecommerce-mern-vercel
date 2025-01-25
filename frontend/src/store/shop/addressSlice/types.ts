export type EditAddressParams = {
	userId: string;
	addressId: string;
	formData: Record<string, string | null>;
};

export type DeleteAddressParams = {
	userId: string;
	addressId: string;
};
