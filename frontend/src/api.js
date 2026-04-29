import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://ai-customer-support-dashboard-sw2c.onrender.com';
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('supportToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
