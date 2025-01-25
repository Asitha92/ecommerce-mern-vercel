export type ShoppingViewLayoutProps = {
	children: React.ReactNode;
};

export type MenuItemsProps = {
	id: string;
	label: string;
	path: string;
};

export type User = {
	_id: string;
	userName: string;
	email: string;
	role: string;
};

export type FilterSubOption = {
	id: string;
	label: string;
};

export type SortOption = {
	id: string;
	label: string;
};

export type FilterOption = {
	category: FilterSubOption[];
	brand: FilterSubOption[];
};

export type ProductFilterProps = {
	filters: Record<string, string[]>;
	handleFilters: (getSectionId: string, getCurrentOption: string) => void;
};

export type CartItem = {
	salePrice: number;
	price: number;
	title: string;
	image: string;
	productId: string;
	quantity: number;
	_id: string;
};

export type UserCartItemsContentProps = {
	cartItem: CartItem;
};
