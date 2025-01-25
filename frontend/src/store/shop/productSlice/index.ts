import { SHOP_LISTING_URL, SHOP_PRODUCTS_DETAIL_URL } from '@/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchAllFilteredProductsParams } from './types';

const initialState = {
	isLoading: false,
	productList: [],
	productDetails: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllFilteredProducts = createAsyncThunk(
	SHOP_LISTING_URL,
	async ({
		filterParams,
		sortParams,
		signal,
	}: fetchAllFilteredProductsParams) => {
		const query = new URLSearchParams({
			...filterParams,
			sortBy: sortParams,
		});

		const result = await axios.get(
			`${API_BASE_URL}/api/shop/products/product-list?${query}`,
			{ signal } // Pass the signal for request cancellation
		);

		return result?.data;
	}
);

export const fetchProductDetails = createAsyncThunk(
	SHOP_PRODUCTS_DETAIL_URL,
	async (_id: string) => {
		const result = await axios.get(
			`${API_BASE_URL}/api/shop/products/product-list/${_id}`
		);
		return result?.data;
	}
);

const ShoppingProductSlice = createSlice({
	name: 'shoppingProducts',
	initialState,
	reducers: {
		setProductDetails: (state) => {
			state.productDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllFilteredProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllFilteredProducts.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			})
			.addCase(fetchProductDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProductDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productDetails = action.payload?.data;
			})
			.addCase(fetchProductDetails.rejected, (state) => {
				state.isLoading = false;
				state.productDetails = null;
			});
	},
});

export const { setProductDetails } = ShoppingProductSlice.actions;
export default ShoppingProductSlice.reducer;
