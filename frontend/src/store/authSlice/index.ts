import { CHECK_AUTH, SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL } from '@/constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialState, FormData } from './types';

const initialState: InitialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signUpUser = createAsyncThunk(
	SIGNUP_URL,
	async (formData: FormData) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/signUp`,
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	}
);

export const signInUser = createAsyncThunk(
	SIGNIN_URL,
	async (formData: FormData) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/signIn`,
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	}
);

export const checkAuth = createAsyncThunk(CHECK_AUTH, async () => {
	const response = await axios.get(`${API_BASE_URL}/api/auth/checkAuth`, {
		withCredentials: true,
		headers: {
			'Cache-Control': 'no-store, no-cache, must-revalidate proxy-revalidate',
			Expires: '0',
		},
	});
	return response.data;
});

export const signOutUser = createAsyncThunk(SIGNOUT_URL, async () => {
	const response = await axios.post(
		`${API_BASE_URL}/api/auth/signOut`,
		{},
		{
			withCredentials: true,
		}
	);
	return response.data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUpUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signUpUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(signUpUser.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(signInUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signInUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = action.payload.success;
				state.user = action.payload.success ? action.payload.user : null;
			})
			.addCase(signInUser.rejected, (state) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = action.payload.success;
				state.user = action.payload.user ? action.payload.user : null;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(signOutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signOutUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = !action.payload.success;
				state.user = action.payload.success ? null : action.payload.user;
			})
			.addCase(signOutUser.rejected, (state) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer; // export reducer to store.js
