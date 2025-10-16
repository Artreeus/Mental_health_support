import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
  getDashboard: () => api.get('/user/dashboard'),
  getBookings: () => api.get('/user/bookings'),
};

// Booking API calls
export const bookingAPI = {
  createBooking: (data: any) => api.post('/booking/create', data),
  getBooking: (id: string) => api.get(`/booking/${id}`),
  cancelBooking: (id: string) => api.put(`/booking/${id}/cancel`),
  getAvailableSlots: (date?: string) =>
    api.get('/booking/slots/available', { params: { date } }),
};

// Support API calls
export const supportAPI = {
  submitRequest: (data: any) => api.post('/support/request', data),
  getMyRequests: () => api.get('/support/my-requests'),
  getRequest: (id: string) => api.get(`/support/request/${id}`),
};

// Admin API calls
export const adminAPI = {
  // Authentication
  login: (email: string, password: string) => api.post('/admin/login', { email, password }),
  
  // Statistics
  getStats: () => api.get('/admin/stats'),
  
  // Users
  getAllUsers: (params?: { page?: number; limit?: number; search?: string }) => 
    api.get('/admin/users', { params }),
  getUserById: (id: string) => api.get(`/admin/users/${id}`),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  blockUser: (id: string) => api.put(`/admin/users/${id}/block`),
  unblockUser: (id: string) => api.put(`/admin/users/${id}/unblock`),
  
  // Bookings/Sessions
  getAllBookings: (params?: { page?: number; limit?: number; status?: string }) => 
    api.get('/admin/bookings', { params }),
  getBookingById: (id: string) => api.get(`/admin/bookings/${id}`),
  
  // Messages/Support Requests
  getAllMessages: (params?: { page?: number; limit?: number; unread?: boolean }) => 
    api.get('/admin/messages', { params }),
  getMessageById: (id: string) => api.get(`/admin/messages/${id}`),
  markMessageRead: (id: string) => api.put(`/admin/messages/${id}/read`),
  replyToMessage: (id: string, reply: string) => api.post(`/admin/messages/${id}/reply`, { reply }),
  
  // Analytics
  getUserGrowth: (period?: string) => api.get('/admin/analytics/user-growth', { params: { period } }),
  getSessionStats: (period?: string) => api.get('/admin/analytics/sessions', { params: { period } }),
  getRevenueStats: (period?: string) => api.get('/admin/analytics/revenue', { params: { period } }),
  
  // Activity Logs
  getActivityLogs: (params?: { page?: number; limit?: number }) => 
    api.get('/admin/activity-logs', { params }),
};

export default api;
