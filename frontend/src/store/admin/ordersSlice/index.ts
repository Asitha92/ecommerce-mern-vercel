import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialState, UpdateOrderStatusProps } from './types';

const initialState: InitialState = {
	orderList: [],
	orderDetails: null,
	isLoading: false,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllOrdersForAdmin = createAsyncThunk(
	'/order/getAllOrdersForAdmin',
	async () => {
		const response = await axios.get(`${API_BASE_URL}/api/admin/orders/get`);

		return response.data;
	}
);

export const getOrderDetailsForAdmin = createAsyncThunk(
	'/order/getOrderDetailsForAdmin',
	async (id: string) => {
		const response = await axios.get(
			`${API_BASE_URL}/api/admin/orders/details/${id}`
		);

		return response.data;
	}
);

export const updateOrderStatus = createAsyncThunk(
	'/order/updateOrderStatus',
	async ({ id, orderStatus }: UpdateOrderStatusProps) => {
		const response = await axios.put(
			`${API_BASE_URL}/api/admin/orders/update/${id}`,
			{
				orderStatus,
			}
		);

		return response.data;
	}
);

const adminOrderSlice = createSlice({
	name: 'adminOrderSlice',
	initialState,
	reducers: {
		resetOrderDetails: (state) => {
			state.orderDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOrdersForAdmin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderList = action.payload.data;
			})
			.addCase(getAllOrdersForAdmin.rejected, (state) => {
				state.isLoading = false;
				state.orderList = [];
			})
			.addCase(getOrderDetailsForAdmin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderDetails = action.payload.data;
			})
			.addCase(getOrderDetailsForAdmin.rejected, (state) => {
				state.isLoading = false;
				state.orderDetails = null;
			});
	},
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
