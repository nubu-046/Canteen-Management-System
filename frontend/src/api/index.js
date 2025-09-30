import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

// Add token to headers if it exists
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

// Auth calls
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Menu calls
export const fetchMenuItems = () => API.get('/menu');
export const createMenuItem = (itemData) => API.post('/menu', itemData); // Now protected

// Order calls
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchOrders = () => API.get('/orders');
export const fetchOrderById = (id) => API.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });

