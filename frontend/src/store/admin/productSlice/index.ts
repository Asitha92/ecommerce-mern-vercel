import {
	ADMIN_PRODUCTS_ADD_URL,
	ADMIN_PRODUCTS_DELETE_URL,
	ADMIN_PRODUCTS_EDIT_URL,
	ADMIN_PRODUCTS_LIST_URL,
} from '@/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EditProductProps, FormData } from './types';

const initialState = {
	isLoading: false,
	productList: [],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addNewProduct = createAsyncThunk(
	ADMIN_PRODUCTS_ADD_URL,
	async (formData: FormData) => {
		const result = await axios.post(
			`${API_BASE_URL}/api/admin/products/add-product`,
			formData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return result?.data;
	}
);

export const editProduct = createAsyncThunk(
	ADMIN_PRODUCTS_EDIT_URL,
	async ({ _id, formData }: EditProductProps) => {
		const result = await axios.put(
			`${API_BASE_URL}/api/admin/products/edit-product/${_id}`,
			formData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return result?.data;
	}
);

export const deleteProduct = createAsyncThunk(
	ADMIN_PRODUCTS_DELETE_URL,
	async (_id: string) => {
		const result = await axios.delete(
			`${API_BASE_URL}/api/admin/products/delete-product/${_id}`
		);
		return result?.data;
	}
);

export const fetchAllProducts = createAsyncThunk(
	ADMIN_PRODUCTS_LIST_URL,
	async () => {
		const result = await axios.get(
			`${API_BASE_URL}/api/admin/products/product-list`
		);
		return result?.data;
	}
);

const AdminProductSlice = createSlice({
	name: 'adminProduct',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllProducts.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			});
	},
});

export default AdminProductSlice.reducer;
