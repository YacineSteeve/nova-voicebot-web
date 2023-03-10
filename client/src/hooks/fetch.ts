import {ref, watch} from 'vue';
import type {Ref} from 'vue';
import { novaApi, novaAuth, UserData } from '@/lib/client';
import type {ApiResponse} from '@/lib/client';
import cookies from '@/lib/cookies';

type ApiEndPoint = 'completion' | 'speech';
type AuthEndPoint = 'login' | 'signup' | 'userinfo';

const API_ENDPOINTS = ['completion', 'speech'];
const AUTH_ENDPOINTS = ['login', 'signup', 'userinfo'];

export interface FetchResponse<T> {
    data: Ref<T | null>;
    error: Ref;
    isFetching: Ref<boolean>;
}

export interface FetchOptions {
    type: ApiEndPoint | AuthEndPoint;
    prompt?: Ref<string>;
    user?: string;
    text?: Ref<string>;
    lang?: Ref<string>;
    data?: UserData;
}

function parseApiResponse(response: ApiResponse, type: ApiEndPoint): string | null {
    if (type === 'completion') {
        return response.data.completion.choices[0].text;
    } else if (type === 'speech') {
        return response.data.speech.speech;
    }
    return null;
}

export async function useFetch<T>(request: FetchOptions): Promise<FetchResponse<T>> {
    const state: FetchResponse<T> = {
        data: ref(null),
        error: ref(null),
        isFetching: ref(false)
    };

    async function doFetch() {
        state.data.value = null;
        state.error.value = null;
        state.isFetching.value = true;

        if (API_ENDPOINTS.includes(request.type)) {
            const valuesNotToFetch = ['', undefined];

            if (
                !valuesNotToFetch.includes(request.prompt?.value as string) ||
                !valuesNotToFetch.includes(request.text?.value as string)
            ) {
                novaApi.get(`/${request.type}`, {
                    params: {
                        prompt: request.prompt?.value,
                        user: request.user,
                        text: request.text?.value,
                        lang: request.lang?.value
                    },
                    headers: {
                        Authorization: `Bearer ${cookies.get('nova-auth-token')}`
                    }
                })
                    .then(response => {
                        state.data.value = parseApiResponse(response, request.type as ApiEndPoint) as typeof state.data.value;
                    })
                    .catch(error => {
                        state.error.value = error.response.data.error || error;
                    })
                    .finally(() => {
                        state.isFetching.value = false;
                    });
            }
        } else if (AUTH_ENDPOINTS.includes(request.type)) {
            novaAuth.post(`/${request.type}`, {
                username: request.data?.username,
                email: request.data?.email,
                password: request.data?.password,
                token: request.data?.token
            })
                .then(response => {
                    state.data.value = response.data;
                })
                .catch(error => {
                    state.error.value = error.response.data.error || error;
                })
                .finally(() => {
                    state.isFetching.value = false;
                });
        }
    }

    if (request.type === 'completion') {
        watch(
            [request.prompt],
            doFetch,
            {immediate: true}
        );
    } else if (request.type === 'speech') {
        watch(
            [request.text, request.lang],
            doFetch,
            {immediate: true}
        );
    } else {
        await doFetch();
    }


    return state;
}
