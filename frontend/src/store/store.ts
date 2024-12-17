// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import paymentsReducer from './paymentsSlice'

export const store = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			payments: paymentsReducer,
		},
	})
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
