import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderDataProps, CapturePaymentProps } from './types';
import axios from 'axios';

const initialState = {
	approvalURL: null,
	isLoading: false,
	orderId: null,
	orderList: [],
	orderDetails: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createNewOrder = createAsyncThunk(
	'/order/createNewOrder',
	async (orderData: OrderDataProps) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/shop/order/create`,
			orderData
		);
		return response.data;
	}
);

export const capturePayment = createAsyncThunk(
	'/order/capturePayment',
	async ({ paymentId, PayerID, orderId }: CapturePaymentProps) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/shop/order/capture`,
			{
				paymentId,
				PayerID,
				orderId,
			}
		);

		return response.data;
	}
);

export const getAllOrdersByUserId = createAsyncThunk(
	'/order/getAllOrdersByUserId',
	async (userId: string) => {
		const response = await axios.get(
			`${API_BASE_URL}/api/shop/order/list/${userId}`
		);

		return response.data;
	}
);

export const getOrderDetails = createAsyncThunk(
	'/order/getOrderDetails',
	async (id: string) => {
		const response = await axios.get(
			`${API_BASE_URL}/api/shop/order/details/${id}`
		);

		return response.data;
	}
);

const shopOrderSlice = createSlice({
	name: 'shopOrder',
	initialState,
	reducers: {
		resetOrderDetails: (state) => {
			state.orderDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createNewOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createNewOrder.fulfilled, (state, action) => {
				console.log('action.payload', action.payload);
				state.isLoading = false;
				state.approvalURL = action.payload.approvalURL;
				state.orderId = action.payload.orderId;
				sessionStorage.setItem(
					'currentOrderId',
					JSON.stringify(action.payload.orderId)
				);
			})
			.addCase(createNewOrder.rejected, (state) => {
				state.isLoading = false;
				state.approvalURL = null;
				state.orderId = null;
			})
			.addCase(getAllOrdersByUserId.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderList = action.payload.data;
			})
			.addCase(getAllOrdersByUserId.rejected, (state) => {
				state.isLoading = false;
				state.orderList = [];
			})
			.addCase(getOrderDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrderDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderDetails = action.payload.data;
			})
			.addCase(getOrderDetails.rejected, (state) => {
				state.isLoading = false;
				state.orderDetails = null;
			});
	},
});

export const { resetOrderDetails } = shopOrderSlice.actions;

export default shopOrderSlice.reducer;
