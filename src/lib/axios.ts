import axios from 'axios';

export const api =axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'https://dummyjson.com',
    timeout: 8000,
})

/* INTERCEPTORES */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);