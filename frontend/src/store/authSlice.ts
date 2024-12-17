import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface AuthState {
	accessToken: string | null
	role: 'anonymous' | 'user' | 'admin' | null
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	accessToken: null,
	role: null,
	loading: false,
	error: null,
}

export const fetchAnonymousToken = createAsyncThunk(
	'auth/fetchAnonymousToken',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/auth/anonymous'
			)
			return response.data
		} catch (err) {
			return rejectWithValue('Не удалось получить анонимный токен')
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken(state, action: PayloadAction<string>) {
			state.accessToken = action.payload
			localStorage.setItem('accessToken', action.payload)
		},
		setRole(state, action: PayloadAction<'anonymous' | 'user' | 'admin'>) {
			state.role = action.payload
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		logout(state) {
			state.accessToken = null
			state.role = 'anonymous'
			localStorage.removeItem('accessToken')
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAnonymousToken.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchAnonymousToken.fulfilled, (state, action) => {
				state.loading = false
				state.accessToken = action.payload.accessToken
				state.role = 'anonymous'
				localStorage.setItem('accessToken', action.payload.accessToken)
			})
			.addCase(fetchAnonymousToken.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export const { setAccessToken, setRole, setLoading, setError, logout } =
	authSlice.actions

export default authSlice.reducer
