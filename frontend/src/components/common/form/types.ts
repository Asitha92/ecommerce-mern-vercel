import { FormControlProps } from './formConfig';

export type FormData = Record<string, string | null>;

export type FormProps = {
	buttonText: string;
	formControls: FormControlProps[];
	formData: FormData | null;
	isButtonDisabled?: boolean;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
};
