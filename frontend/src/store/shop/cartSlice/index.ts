import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	SHOP_CART_ITEM_ADD_URL,
	SHOP_CART_ITEM_LIST_URL,
	SHOP_CART_ITEM_DELETE_URL,
	SHOP_CART_ITEM_UPDATE_URL,
} from '@/constants';
import axios from 'axios';
import {
	AddToCartItemsParams,
	DeleteCartItemsParams,
	InitialStateProps,
} from './types';

const initialState: InitialStateProps = {
	cart: null,
	isLoading: false,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addCartItems = createAsyncThunk(
	SHOP_CART_ITEM_ADD_URL,
	async ({ userId, productId, quantity }: AddToCartItemsParams) => {
		const response = await axios.post(`${API_BASE_URL}/api/shop/cart/add`, {
			userId,
			productId,
			quantity,
		});
		return response.data;
	}
);

export const fetchCartItems = createAsyncThunk(
	SHOP_CART_ITEM_LIST_URL,
	async (userId: string) => {
		const response = await axios.get(
			`${API_BASE_URL}/api/shop/cart/get/${userId}`
		);
		return response.data;
	}
);

export const deleteCartItems = createAsyncThunk(
	SHOP_CART_ITEM_DELETE_URL,
	async ({ userId, productId }: DeleteCartItemsParams) => {
		const response = await axios.delete(
			`${API_BASE_URL}/api/shop/cart/${userId}/${productId}`
		);
		return response.data;
	}
);

export const updateCartItemsQuantity = createAsyncThunk(
	SHOP_CART_ITEM_UPDATE_URL,
	async ({ userId, productId, quantity }: AddToCartItemsParams) => {
		const response = await axios.put(
			`${API_BASE_URL}/api/shop/cart/updateCart`,
			{
				userId,
				productId,
				quantity,
			}
		);
		return response.data;
	}
);

const shoppingCartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cart = action.payload.data;
			})
			.addCase(addCartItems.rejected, (state) => {
				state.isLoading = false;
				state.cart = null;
			})
			.addCase(fetchCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cart = action.payload.data;
			})
			.addCase(fetchCartItems.rejected, (state) => {
				state.isLoading = false;
				state.cart = null;
			})
			.addCase(deleteCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cart = action.payload.data;
			})
			.addCase(deleteCartItems.rejected, (state) => {
				state.isLoading = false;
				state.cart = null;
			})
			.addCase(updateCartItemsQuantity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCartItemsQuantity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cart = action.payload.data;
			})
			.addCase(updateCartItemsQuantity.rejected, (state) => {
				state.isLoading = false;
				state.cart = null;
			});
	},
});

export default shoppingCartSlice.reducer;
