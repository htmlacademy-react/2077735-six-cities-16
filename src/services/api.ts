import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://16.design.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  //   api.interceptors.response.use(
  //     (response) => response,
  //     (error: AxiosError<DetailMessageType>) => {
  //       if (error.response && shouldDisplayError(error.response)) {
  //         const detailMessage = (error.response.data);

  //         toast.warn(detailMessage.message);
  //       }

  //       throw error;
  //     }
  //   );

  return api;
};
