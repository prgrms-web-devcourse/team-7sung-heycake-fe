import axios, { AxiosInstance } from 'axios';

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === 'ECONNABORTED' || error.response?.status === 408) {
        alert('요청이 만료되었습니다.');
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
  timeout: 10000,
};

const internalApi = setInterceptor(
  axios.create({
    ...options,
  })
);

export default internalApi;
