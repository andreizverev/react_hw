import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AppApi from 'shared/api/ApiServise';
import { authApi } from 'shared/api/authApi';
import { productsApi } from 'shared/api/productsApi';
import { userSlice } from 'entities/user/model/user';
import { cartSlice } from 'entities/Cart/model/cart';
import { productsSlice } from 'entities/product/model/products';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: AppApi,
			},
		}).concat([authApi.middleware, productsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
