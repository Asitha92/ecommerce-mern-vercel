import { FormControlProps } from '@/components/common/form/formConfig';

export const OrderStatusFormControls: FormControlProps[] = [
	{
		label: 'Order Status',
		name: 'status',
		componentType: 'select',
		placeholder: 'Select Order Status',
		options: [
			{ id: 'pending', value: 'pending', label: 'Pending' },
			{ id: 'inProcess', value: 'inProcess', label: 'In Process' },
			{
				id: 'inShipping',
				value: 'inShipping',
				label: 'In Shipping',
			},
			{ id: 'delivered', value: 'delivered', label: 'Delivered' },
			{ id: 'rejected', value: 'rejected', label: 'Rejected' },
		],
	},
];
