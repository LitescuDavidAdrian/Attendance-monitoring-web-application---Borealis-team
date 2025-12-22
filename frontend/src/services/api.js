import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Event Group API
export const eventGroupAPI = {
    getAll: () => api.get('/eventgroup'),
    getById: (id) => api.get(`/eventgroup/${id}`),
    getWithEvents: (id) => api.get(`/eventgroup/${id}/events`),
    create: (data) => api.post('/eventgroup', data),
    update: (id, data) => api.put(`/eventgroup/${id}`, data),
    delete: (id) => api.delete(`/eventgroup/${id}`),
    export: (id, format = 'xlsx') =>
        api.get(`/eventgroup/${id}/export?format=${format}`, { responseType: 'blob' }),
};

// Event API
export const eventAPI = {
    getAll: () => api.get('/event'),
    getById: (id) => api.get(`/event/${id}`),
    create: (data) => api.post('/event', data),
    update: (id, data) => api.put(`/event/${id}`, data),
    delete: (id) => api.delete(`/event/${id}`),
    getQRCode: (id) => api.get(`/event/${id}/qrcode`),
    export: (id, format = 'xlsx') =>
        api.get(`/event/${id}/export?format=${format}`, { responseType: 'blob' }),
};

// Attendance API
export const attendanceAPI = {
    getAll: () => api.get('/attendance'),
    getById: (id) => api.get(`/attendance/${id}`),
    create: (data) => api.post('/attendance', data),
    update: (id, data) => api.put(`/attendance/${id}`, data),
    delete: (id) => api.delete(`/attendance/${id}`),
};

// Check-in API
export const checkinAPI = {
    checkin: (accessCode, StudentName, StudentId) =>
        api.post('/checkin', { accessCode, StudentName, StudentId }),
};

export default api;
