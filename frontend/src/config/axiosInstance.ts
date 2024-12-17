// src/config/axiosInstance.ts

import axios from 'axios';
import { store } from '@/store/store';
import { selectAccessToken } from '@/store/authSelectors';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const state = store().getState();
  const token = selectAccessToken(state);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
