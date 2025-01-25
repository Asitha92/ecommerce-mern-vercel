import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialState, Review } from './types';

const initialState: InitialState = {
	isLoading: false,
	reviews: [],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addReview = createAsyncThunk(
	'/order/addReview',
	async (formdata: Review) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/shop/review/add`,
			formdata
		);

		return response.data;
	}
);

export const getReviews = createAsyncThunk(
	'/order/getReviews',
	async (id: string) => {
		const response = await axios.get(`${API_BASE_URL}/api/shop/review/${id}`);

		return response.data;
	}
);

const reviewSlice = createSlice({
	name: 'reviewSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.reviews = action.payload.data;
			})
			.addCase(getReviews.rejected, (state) => {
				state.isLoading = false;
				state.reviews = [];
			});
	},
});

export default reviewSlice.reducer;
