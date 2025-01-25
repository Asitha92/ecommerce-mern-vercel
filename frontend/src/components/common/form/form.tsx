import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/components';
import { FormControlProps } from './formConfig';
import { FormProps } from './types';

function CommonForm({
	buttonText,
	formControls,
	formData,
	isButtonDisabled,
	onSubmit,
	setFormData,
}: FormProps) {
	function renderInputsByComponentName(controlItem: FormControlProps) {
		let controlElement = null;
		const value = formData[controlItem.name] || '';
		switch (controlItem.componentType) {
			case 'input':
				controlElement = (
					<Input
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						type={controlItem.type}
						value={value}
						onChange={(event) =>
							setFormData({
								...formData,
								[controlItem.name]: event.target.value,
							})
						}
					/>
				);
				break;
			case 'select':
				controlElement = (
					<Select
						onValueChange={(value) => {
							setFormData({
								...formData,
								[controlItem.name]: value,
							});
						}}
						value={value}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder={controlItem.label} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{controlItem.options && controlItem.options.length > 0
									? controlItem.options?.map((option) => (
											<SelectItem
												key={option.id}
												value={option.value}
											>
												{option.label}
											</SelectItem>
									  ))
									: null}
							</SelectGroup>
						</SelectContent>
					</Select>
				);
				break;
			case 'textarea':
				controlElement = (
					<Textarea
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						value={value}
						onChange={(event) =>
							setFormData({
								...formData,
								[controlItem.name]: event.target.value,
							})
						}
					/>
				);
				break;
			default:
				controlElement = (
					<Input
						id={controlItem.name}
						name={controlItem.name}
						placeholder={controlItem.placeholder}
						type={controlItem.type}
						value={value}
						onChange={(event) =>
							setFormData({
								...formData,
								[controlItem.name]: event.target.value,
							})
						}
					/>
				);
		}
		return controlElement;
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col gap-3">
				{formControls.map((controlItem) => {
					return (
						<div
							key={controlItem.name}
							className="grid -full gap-1.5"
						>
							<label className="mb-1">{controlItem.label}</label>
							{renderInputsByComponentName(controlItem)}
						</div>
					);
				})}
			</div>
			<Button
				type="submit"
				className="mt-2 w-full"
				disabled={isButtonDisabled}
			>
				{buttonText || 'Submit'}
			</Button>
		</form>
	);
}

export default CommonForm;
