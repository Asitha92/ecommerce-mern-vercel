export type fetchAllFilteredProductsParams = {
	filterParams: Record<string, string[]>;
	sortParams: string;
	signal: AbortSignal;
};
