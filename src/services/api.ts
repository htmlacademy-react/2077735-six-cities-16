import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
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
