import axios from "axios";

export const url = 'http://arendarr4.com/api';
// export const url = 'http://localhost:5000/api'
export const baseImageUrl = 'http://arendarr4.com'; // Базовый URL для изображений
// export const baseImageUrl = 'http://localhost:5000'; // Базовый URL для изображений

const instance = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json', },
})

instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default instance