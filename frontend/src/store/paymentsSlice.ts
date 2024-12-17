// src/store/paymentsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axiosInstance';
import { getAccessToken, getUserIdFromToken, validateToken } from '@/lib';

// Define the async thunk for fetching payment history
export const fetchPaymentHistory = createAsyncThunk(
  'payments/fetchPaymentHistory',
  async (_, { rejectWithValue }) => {
    const token = getAccessToken();
    if (token && validateToken(token)) {
      const userId = getUserIdFromToken(token);
      if (userId) {
        try {
          const response = await axiosInstance.get(`/payments/history/${userId}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching payment history:', error);
          return rejectWithValue('Error fetching payment history');
        }
      } else {
        console.error('Invalid user ID');
        return rejectWithValue('Invalid user ID');
      }
    } else {
      console.error('Invalid or expired token');
      return rejectWithValue('Invalid or expired token');
    }
  }
);

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    setHistory(state, action) {
      state.history = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      });
  },
});

export const { setHistory, setLoading, setError } = paymentsSlice.actions;

export default paymentsSlice.reducer;