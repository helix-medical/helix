import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

const secureAPI = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default api;
export { secureAPI };
