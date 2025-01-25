import { FormControlProps } from '@/components/common/form/formConfig';

export const addressFormElements: FormControlProps[] = [
	{
		label: 'Address',
		name: 'address',
		type: 'text',
		componentType: 'input',
		placeholder: 'Enter your address',
	},
	{
		label: 'City',
		name: 'city',
		type: 'text',
		componentType: 'input',
		placeholder: 'Enter your city',
	},
	{
		label: 'Zip Code',
		name: 'zipCode',
		type: 'text',
		componentType: 'input',
		placeholder: 'Enter your zip code',
	},
	{
		label: 'Phone Number',
		name: 'phone',
		type: 'text',
		componentType: 'input',
		placeholder: 'Enter your phone number',
	},
	{
		label: 'Notes',
		name: 'notes',
		componentType: 'textarea',
		placeholder: 'Additional instructions or notes',
	},
];
