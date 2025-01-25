import {
	BabyIcon,
	CircleUser,
	LayoutDashboard,
	SquareUser,
} from 'lucide-react';

export const shoppingViewHeaderMenuItems = [
	{
		id: 'home',
		label: 'Home',
		path: '/shop/home',
	},
	{
		id: 'products',
		label: 'Products',
		path: '/shop/listing',
	},
	{
		id: 'men',
		label: 'Men',
		path: '/shop/listing',
	},
	{
		id: 'women',
		label: 'Women',
		path: '/shop/listing',
	},
	{
		id: 'kids',
		label: 'Kids',
		path: '/shop/listing',
	},
	{
		id: 'accessories',
		label: 'Accessories',
		path: '/shop/listing',
	},
	{
		id: 'search',
		label: 'Search',
		path: '/shop/search',
	},
];

export const categoryOptionMap = {
	men: 'Men',
	women: 'Women',
	kids: 'Kids',
	accessories: 'Accessories',
};

export const brandOptionMap = {
	nike: 'Nike',
	adidas: 'Adidas',
	puma: 'Puma',
	reebok: 'Reebok',
	fossil: 'Fossil',
};

export const filterOptions = {
	category: [
		{ id: 'men', label: 'Men' },
		{ id: 'women', label: 'Women' },
		{ id: 'kids', label: 'Kids' },
		{ id: 'accessories', label: 'accessories' },
	],
	brand: [
		{ id: 'nike', label: 'Nike' },
		{ id: 'adidas', label: 'Adidas' },
		{ id: 'puma', label: 'Puma' },
		{ id: 'reebok', label: 'Reebok' },
		{ id: 'fossil', label: 'Fossil' },
	],
};

export const sortOptions = [
	{ id: 'price-lowToHigh', label: 'Price: Low to High' },
	{ id: 'price-highToLow', label: 'Price: High To Low' },
	{ id: 'title-AtoZ', label: 'Title: A to Z' },
	{ id: 'title-ZtoA', label: 'Title: Z to A' },
];

export const categoriesWithIcons = [
	{ id: 'men', label: 'Men', icon: SquareUser },
	{ id: 'women', label: 'Women', icon: CircleUser },
	{ id: 'kids', label: 'Kids', icon: BabyIcon },
	{ id: 'accessories', label: 'accessories', icon: LayoutDashboard },
];

export const brandsWithIcons = [
	{ id: 'nike', label: 'Nike', icon: SquareUser },
	{ id: 'adidas', label: 'Adidas', icon: CircleUser },
	{ id: 'puma', label: 'Puma', icon: CircleUser },
	{ id: 'reebok', label: 'Reebok', icon: BabyIcon },
	{ id: 'fossil', label: 'Fossil', icon: LayoutDashboard },
];
