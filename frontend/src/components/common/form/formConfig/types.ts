export type SelectOption = {
	value: string;
	id: string;
	label: string;
};

export type FormControlProps = {
	componentType: string;
	label: string;
	name: string;
	placeholder: string;
	type?: string;
	options?: SelectOption[];
};
