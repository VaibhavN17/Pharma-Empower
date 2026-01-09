import axios from 'axios';

// ✅ REAL Render backend URL + /api
const API_BASE_URL = 'https://pharma-empowerr.onrender.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- AUTH ----------
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// ---------- VIDEO ----------
export const videoAPI = {
  getAll: () => api.get('/video'),
  add: (data) => api.post('/video', data),
};

// ---------- ADMIN ----------
export const adminAPI = {
  addPatient: (data) => api.post('/admin/addpatient', data),
  sendNotification: (data) => api.post('/admin/notification', data),
  getNotifications: () => api.get('/admin/notification'),
};

// ---------- APPOINTMENT ----------
export const appointmentAPI = {
  takeAppointment: (data) => api.post('/appointment', data),
  getAllAppointments: () => api.get('/appointment'),
  deleteAppointment: (id) => api.delete(`/appointment/${id}`),
};

// ---------- CHAT ----------
export const chatApi = {
  sendChat: (message) => api.post('/chat', message),
  getChat: () => api.get('/chat'),
};

// ---------- ENQUIRY ----------
export const inquiryAPI = {
  createInquiry: (data) => api.post('/enquiries', data),
  getAllEnquiries: () => api.get('/enquiries'),
};

// ---------- NEWS ----------
export const newsAPI = {
  getNews: () => api.get('/news'),
};

// ---------- SESSION ----------
export const sessionAPI = {
  createSession: (data) => api.post('/sessions', data),
  getAllSessions: () => api.get('/sessions'),
  deleteSession: (id) => api.delete(`/sessions/${id}`),
};

// ---------- CONTACT ----------
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markAsRead: (id) => api.put(`/contact/${id}/read`),
};

// ---------- DASHBOARD ----------
export const dashboardAPI = {
  getStats: () => api.get('/admin/dashboard'),
};

export default api;
