export type ProductProps = {
	componentType?: string;
	label: string;
	name: string;
	options?: ProductOption[];
	placeholder: string;
	type?: string;
};

export type ProductOption = {
	id: string;
	label: string;
	value: string;
};
