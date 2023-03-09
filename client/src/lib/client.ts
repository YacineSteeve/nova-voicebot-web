import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

export const novaApi: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken'
});

export const novaAuth: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/user',
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

export interface AuthError {
    success: boolean;
    error: string;
    fields?: string[];
}

export const isFieldError = (error: AuthError): error is Omit<AuthError, 'fields'> & { fields: string[] } => {
    return error.fields !== undefined;
}
