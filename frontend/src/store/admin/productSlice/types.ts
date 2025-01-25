export type FormData = Record<string, string | null>;

export type EditProductProps = {
	_id: string;
	formData: FormData;
};
