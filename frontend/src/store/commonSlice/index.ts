import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	featureImageList: [],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getFeatureImages = createAsyncThunk(
	'/common/getFeatureImages',
	async () => {
		const response = await axios.get(`${API_BASE_URL}/api/common/feature/get`);

		return response.data;
	}
);

export const addFeatureImage = createAsyncThunk(
	'/common/addFeatureImage',
	async (image: string) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/common/feature/add`,
			{ image }
		);

		return response.data;
	}
);

const commonSlice = createSlice({
	name: 'commonSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFeatureImages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFeatureImages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.featureImageList = action.payload.data;
			})
			.addCase(getFeatureImages.rejected, (state) => {
				state.isLoading = false;
				state.featureImageList = [];
			});
	},
});

export default commonSlice.reducer;
