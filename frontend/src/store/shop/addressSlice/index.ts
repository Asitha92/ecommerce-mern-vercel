import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DeleteAddressParams, EditAddressParams } from './types';

const initialState = {
	isLoading: false,
	addressList: [],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addNewAddress = createAsyncThunk(
	'/address/addNewAddress',
	async (formData: Record<string, string>) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/shop/address/add`,
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	}
);

export const fetchAllAddresses = createAsyncThunk(
	'/address/fetchAllAddresses',
	async (userId: string) => {
		const response = await axios.get(
			`${API_BASE_URL}/api/shop/address/get/${userId}`
		);
		return response.data;
	}
);

export const editAddress = createAsyncThunk(
	'/address/editAddress',
	async ({ userId, addressId, formData }: EditAddressParams) => {
		const response = await axios.put(
			`${API_BASE_URL}/api/shop/address/edit/${userId}/${addressId}`,
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	}
);

export const deleteAddress = createAsyncThunk(
	'/address/deleteAddress',
	async ({ userId, addressId }: DeleteAddressParams) => {
		const response = await axios.delete(
			`${API_BASE_URL}/api/shop/address/delete/${userId}/${addressId}`
		);
		return response.data;
	}
);

const addressSlice = createSlice({
	name: 'address',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addNewAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addNewAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addressList = action.payload.data;
			})
			.addCase(addNewAddress.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			})
			.addCase(fetchAllAddresses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllAddresses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addressList = action.payload.data;
			})
			.addCase(fetchAllAddresses.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			})
			.addCase(editAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addressList = action.payload.data;
			})
			.addCase(editAddress.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			})
			.addCase(deleteAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addressList = action.payload.data;
			})
			.addCase(deleteAddress.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			});
	},
});

export default addressSlice.reducer;
