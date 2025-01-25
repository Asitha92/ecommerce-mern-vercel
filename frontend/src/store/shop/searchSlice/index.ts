import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	searchResults: [],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getSearchResults = createAsyncThunk(
	'/order/getSearchResults',
	async (keyword: string) => {
		const response = await axios.get(
			`${API_BASE_URL}/api/shop/search/${keyword}`
		);

		return response.data;
	}
);

const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		resetSearchResults: (state) => {
			state.searchResults = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSearchResults.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSearchResults.fulfilled, (state, action) => {
				state.isLoading = false;
				state.searchResults = action.payload.data;
			})
			.addCase(getSearchResults.rejected, (state) => {
				state.isLoading = false;
				state.searchResults = [];
			});
	},
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
