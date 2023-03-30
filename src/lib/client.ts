import axios from 'axios';
import type {AxiosResponse} from 'axios';
import type {Ref} from 'vue';
import cookies from '@/lib/cookies';

const SERVER_URL = 'https://api-nova-voicebot.herokuapp.com';

const baseInstanceOptions = {
    baseURL: SERVER_URL,
    maxBodyLength: 2000,
    xsrfHeaderName: 'X-CSRFTOKEN',
    xsrfCookieName: 'csrftoken',
};

export type Response = AxiosResponse;

export interface RequestData {
    user?: string;
    prompt?: Ref<string>;
    text?: Ref<string>;
    lang?: Ref<string>;
    username?: string;
    email?: string;
    password?: string;
    token?: string;
    message?: string;
    name?: string;
    subject?: string;
}

export const apiClient = (url: string, data: RequestData): Promise<Response> => {
    return axios.create({
        ...baseInstanceOptions,
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${cookies.get('nova-auth-token')}`
        },
    }).post(
        url,
        {
            user: data.user,
            prompt: data.prompt?.value,
            text: data.text?.value,
            lang: data.lang?.value
        },
    );
}

export const authClient = (url: string, data: RequestData): Promise<Response> => {
    return axios.create({
        ...baseInstanceOptions,
        timeout: 2000,
    }).post(
        url,
        {
            username: data.username,
            email: data.email,
            password: data.password,
            token: data.token
        },
    );
}

export const supportClient = (url: string, data: RequestData): Promise<Response> => {
    return axios.create({
        ...baseInstanceOptions,
        timeout: 2000
    }).post(
        url,
        {
            email: data.email,
            message: data.message,
            name: data.name,
            subject: data.subject
        },
    );
}

export interface User {
    username: string;
    email: string;
}

export interface UserInfoResponse {
    success: boolean;
    user: User;
}

export interface LoginResponse {
    success: boolean;
    token: string;
}

export interface SignupResponse {
    success: boolean;
}

export interface DeleteResponse {
    success: boolean;
}

export interface ContactResponse {
    success: boolean;
    message: string;
    info: string;
}

export interface ResponseError {
    success: boolean;
    error: string;
    fields?: string[];
    categories?: string[];
}

export const isFieldError = (error: ResponseError): error is Omit<ResponseError, 'fields'> & { fields: string[] } => {
    return error && error.fields !== undefined;
}
