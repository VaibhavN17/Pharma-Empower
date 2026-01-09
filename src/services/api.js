import axios from 'axios';

// ✅ Backend base URL (NO trailing slash needed)
const API_BASE_URL = 'https://pharma-empowerr.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- AUTH ----------
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

// ---------- CONTACT ----------
export const contactAPI = {
  sendMessage: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/contact'),
  markAsRead: (id) => api.put(`/api/contact/${id}/read`),
};

// ---------- DASHBOARD ----------
export const dashboardAPI = {
  getStats: () => api.get('/api/admin/dashboard'),
};

// ---------- NEWS ----------
export const newsAPI = {
  getNews: () => api.get('/api/news'),
};

// ---------- SESSION ----------
export const sessionAPI = {
  createSession: (data) => api.post('/api/session', data),
  getAllSessions: () => api.get('/api/session'),
  deleteSession: (id) => api.delete(`/api/session/${id}`),
};

export default api;
