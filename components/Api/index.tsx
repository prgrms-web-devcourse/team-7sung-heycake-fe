import axios, { AxiosInstance } from 'axios';

import API_ERROR_MESSAGES from '@/constants/Api';

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === 'ECONNABORTED' || error.response?.status === 408) {
        alert(API_ERROR_MESSAGES.REQUEST_EXPIRATION);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const options = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
};

export const internalApi = setInterceptor(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
    ...options,
  })
);

export const publicApi = setInterceptor(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    ...options,
  })
);
