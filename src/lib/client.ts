import axios from 'axios';
import type {AxiosInstance, AxiosResponse} from 'axios';

const SERVER_URL = !import.meta.env.PROD
    ? 'https://api-nova-voicebot.herokuapp.com'
    : `http://localhost:${import.meta.env.VITE_SERVER_PORT || 8000}`;

export const novaApi: AxiosInstance = axios.create({
    baseURL: `${SERVER_URL}/api`,
    timeout: 10000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});

export const novaAuth: AxiosInstance = axios.create({
    baseURL: `${SERVER_URL}/user`,
    timeout: 2000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});

export const novaSupport: AxiosInstance = axios.create({
    baseURL: `${SERVER_URL}/support`,
    timeout: 2000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});

export type ApiResponse = AxiosResponse;

export interface User {
    username: string;
    email: string;
}

export interface UserData {
    token?: string;
    username?: string;
    email?: string;
    password?: string;
}

export interface SupportData {
    email: string;
    message: string;
    name: string;
    subject: string;
}

export interface AuthError {
    success: boolean;
    error: string;
    fields?: string[];
}

export const isFieldError = (error: AuthError): error is Omit<AuthError, 'fields'> & { fields: string[] } => {
    return error && error.fields !== undefined;
}
