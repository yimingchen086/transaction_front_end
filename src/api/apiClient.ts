import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 可以加上攔截器 (interceptors) 處理請求和回應
apiClient.interceptors.request.use(
  (config) => {
    console.log('發送請求', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 發生錯誤', error);
    return Promise.reject(error);
  }
);

export default apiClient;
