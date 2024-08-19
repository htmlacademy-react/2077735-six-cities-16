import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { toast } from 'react-hot-toast';
import { getToken } from './token';
import { ApiConfig } from './const';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiConfig.BaseURL as string,
    timeout: ApiConfig.Timeout as number,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(null, (error) => {
    if (isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        toast.error('Network error');
      }

      if (error.response && error.response.status >= 500) {
        toast.error('Server error');
      }
    }
  });

  return api;
};
