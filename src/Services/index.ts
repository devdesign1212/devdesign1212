import { HandleCustomError } from '@/Utils/handleCustomError';
import axios from 'axios';

const API_CONFIG = {
  timeout: 30000, // 30 seconds
  //   withCredentials: true,
};

// Create an Axios instance
const api = axios.create(API_CONFIG);

// Request interceptor to add Authorization token dynamically
api.interceptors.request.use(
  async config => {
    // console.log('Request:', {
    //   url: config.url,
    //   method: config.method,
    //   headers: config.headers,
    //   data: config.data,
    // });
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors and token expiration
api.interceptors.response.use(
  response => {
    // console.log('Response:', {
    //   url: response.config.url,
    //   status: response.status,
    //   data: response.data,
    // });
    return response;
  },
  async error => {
    // console.error('Response error:', {
    //   url: error.config?.url,
    //   status: error.response?.data?.status,
    //   message: error.message,
    // });
    if (error.response.status === 401) {
      await HandleCustomError(error);
      // showErrorNotification(error?.response?.data, )
    }

    return Promise.reject(error);
  },
);

export default api;
