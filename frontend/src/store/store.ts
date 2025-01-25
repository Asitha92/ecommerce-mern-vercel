import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import AdminProductReducer from './admin/productSlice';
import ShoppingProductReducer from './shop/productSlice';
import ShoppingCartReducer from './shop/cartSlice';
import ShoppingAddressReducer from './shop/addressSlice';
import ShopOrderReducer from './shop/orderSlice';
import AdminOrderReducer from './admin/ordersSlice';
import ShopSearchReducer from './shop/searchSlice';
import ShopReviewReducer from './shop/reviewSlice';
import CommonFeatureReducer from './commonSlice';

const store = configureStore({
	reducer: {
		auth: AuthReducer,

		adminProducts: AdminProductReducer,
		adminOrder: AdminOrderReducer,

		shopProducts: ShoppingProductReducer,
		shopCart: ShoppingCartReducer,
		shopAddress: ShoppingAddressReducer,
		shopOrder: ShopOrderReducer,
		shopSearch: ShopSearchReducer,
		shopReview: ShopReviewReducer,

		commonFeature: CommonFeatureReducer,
	},
});

export type AppDispatch = typeof store.dispatch; // Define the AppDispatch type
export type RootState = ReturnType<typeof store.getState>; // Define the RootState type

export default store; // export the store
