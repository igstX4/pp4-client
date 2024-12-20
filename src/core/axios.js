import axios from "axios";

// export const url = 'https://pp4-server.vercel.app/api';
export const url = 'http://localhost:5000/api'
// export const baseImageUrl = 'https://pp4-server.vercel.app'; // Базовый URL для изображений
export const baseImageUrl = 'http://localhost:5000'; // Базовый URL для изображений

const instance = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json', },
})

instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default instance