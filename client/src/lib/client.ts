import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const novaApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 2000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});
