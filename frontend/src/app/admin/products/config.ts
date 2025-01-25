import { FormControlProps } from '@/components/common/form/formConfig';

export const addProductFormElements: FormControlProps[] = [
	{
		label: 'Title',
		name: 'title',
		type: 'text',
		componentType: 'input',
		placeholder: 'Enter product title',
	},
	{
		label: 'Description',
		name: 'description',
		componentType: 'textarea',
		placeholder: 'Enter product description',
	},
	{
		label: 'Category',
		name: 'category',
		componentType: 'select',
		placeholder: 'Select a category',
		options: [
			{ id: '1', value: 'men', label: 'Men' },
			{ id: '2', value: 'women', label: 'Women' },
			{ id: '3', value: 'kids', label: 'Kids' },
			{ id: '4', value: 'accessories', label: 'Accessories' },
		],
	},
	{
		label: 'Brand',
		name: 'brand',
		componentType: 'select',
		placeholder: 'Select a brand',
		options: [
			{ id: 'nike', value: 'nike', label: 'Nike' },
			{ id: 'adidas', value: 'adidas', label: 'Adidas' },
			{ id: 'puma', value: 'puma', label: 'Puma' },
			{ id: 'reebok', value: 'reebok', label: 'Reebok' },
			{ id: 'fossil', value: 'fossil', label: 'Fossil' },
		],
	},
	{
		label: 'Price',
		name: 'price',
		type: 'number',
		componentType: 'input',
		placeholder: 'Enter product price',
	},
	{
		label: 'Sale Price',
		name: 'salePrice',
		type: 'number',
		componentType: 'input',
		placeholder: 'Enter sale price',
	},
	{
		label: 'Total Stock',
		name: 'totalStock',
		type: 'number',
		componentType: 'input',
		placeholder: 'Enter total stock quantity',
	},
];
