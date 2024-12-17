import { RootState } from './store'

export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectUserRole = (state: RootState) => state.auth.role
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error
