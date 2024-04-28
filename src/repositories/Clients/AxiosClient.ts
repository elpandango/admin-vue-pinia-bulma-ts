import axios from "axios";
import {deleteCookie, getCookie} from "@/utils/helpers";

const baseURL: string = `${import.meta.env.VITE_APP_API_URL}`;

// ALL DEFAULT CONFIGURATION HERE
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/json',
};

const token: string | null = getCookie('token') || localStorage.getItem('token');

const headers = {
    ...defaultHeaders,
    ...(token && {'Authorization': 'Bearer ' + token}),
};


const instance = axios.create({
    baseURL,
    headers,
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.data?.message === 'jwt expired') {
            deleteCookie('token');
            localStorage.removeItem('token');
            window.location.href = '/auth';
        }
        return Promise.reject({
            errors: error?.response?.data?.errors,
            message: error?.response?.data?.message,
            status: error?.response?.status,
        });
    }
);

export default instance;