export type FormData = {
	formData: Record<string, string>;
};

export type Review = {
	productId?: string | null;
	userId?: string;
	userName?: string;
	reviewMessage: string;
	reviewValue: number;
};

export type InitialState = {
	isLoading: boolean;
	reviews?: Review[];
};
