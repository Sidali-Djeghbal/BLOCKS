/**
 * API configuration and utility functions for connecting to the backend
 */

import axios from 'axios';

// Base URL for the backend API
// In a production environment, this would typically be an environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',

  // Feedback endpoints
  FEEDBACK_CREATE: '/feedback/create',
  FEEDBACKS: '/feedbacks',

  // Algorithm endpoints
  ALGORITHMS: '/algorithms',
  ALGORITHM_CREATE: '/algorithm/create',
  ALGORITHM_CHANGE: (id: number) => `/algorithm/change/${id}`,
  ALGORITHM_BY_ID: (id: number) => `/algorithm/${id}`,

  // Lesson endpoints
  LESSONS: '/lessons',
  LESSON_BY_ID: (id: number) => `/lesson/${id}`,

  // Admin endpoints
  ADMIN_ALGORITHMS: '/admin/algorithms',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_APPROVE_TRANSACTION: (id: number) => `/admin/transaction/${id}`,
  ADMIN_FEEDBACKS: '/admin/feedbacks',
  ADMIN_UPDATE_LESSON: (id: number) => `/admin/lesson/${id}`,

  // Local API endpoints (Next.js API routes)
  COMPILE: '/api/compile',
};

// Auth API functions
export const auth = {
  register: async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    const response = await api.post('/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/logout');
    localStorage.removeItem('token');
    return response.data;
  },
};

// Feedback API functions
export const feedback = {
  create: async (message: string) => {
    const response = await api.post('/feedback/create', { message });
    return response.data;
  },

  getAll: async (page?: number) => {
    const response = await api.get('/feedbacks', { params: { page } });
    return response.data;
  },
};

// Algorithms API functions
export const algorithms = {
  getAll: async () => {
    const response = await api.get('/algorithms');
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/algorithms/${id}`);
    return response.data;
  },
};

// Lessons API functions
export const lessons = {
  getAll: async () => {
    const response = await api.get('/lessons');
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },
};

export default api;
