import axios from 'axios';

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
