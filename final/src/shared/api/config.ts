import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from 'app/store';

export const customBaseQuery = fetchBaseQuery({
	// baseUrl: process.env.API_URL,
	// baseUrl: import.meta.env.API_URL,
	baseUrl: 'https://api.v2.react-learning.ru',
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).user.accessToken;

		if (accessToken) {
			headers.set('authorization', accessToken);
		}
		return headers;
	},
});
