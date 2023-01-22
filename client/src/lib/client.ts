import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

export const novaApi: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});

export type ApiResponse = AxiosResponse;
