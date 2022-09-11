/* eslint-disable no-param-reassign */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
const instance: AxiosInstance = axios.create({
  /**
   * Send the request directly to the actual api without using the proxy
   */
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Request Interceptor
 */
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    //TODO: Add token to request
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 */

instance.interceptors.response.use(
  //TODO: Handle response error
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;
