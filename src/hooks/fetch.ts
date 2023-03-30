import {ref, watch} from 'vue';
import type {Ref} from 'vue';
import {
    apiClient,
    authClient,
    supportClient
} from '@/lib/client';
import type {Response, RequestData} from '@/lib/client';

type Client = typeof apiClient | typeof authClient | typeof supportClient;

type EndpointPrefix = 'api' | 'user' | 'support';

type ApiEndpointSuffix = 'completion' | 'speech';
type AuthEndpointSuffix = 'login' | 'signup' | 'userinfo' | 'delete';
type SupportEndpointSuffix = 'contact' | '';

type EndpointSuffix = ApiEndpointSuffix | AuthEndpointSuffix | SupportEndpointSuffix;

const API_ENDPOINTS = ['completion', 'speech'];
const AUTH_ENDPOINTS = ['login', 'signup', 'userinfo', 'delete'];
const SUPPORT_ENDPOINTS = ['contact'];

const getEndpointBase = (endpoint: EndpointSuffix): EndpointPrefix => {
    if (API_ENDPOINTS.includes(endpoint)) {
        return 'api';
    }

    if (AUTH_ENDPOINTS.includes(endpoint)) {
        return 'user';
    }

    if (SUPPORT_ENDPOINTS.includes(endpoint)) {
        return 'support';
    }

    return 'api';
}

export interface FetchResponse<T> {
    data: Ref<T | null>;
    error: Ref;
    isFetching: Ref<boolean>;
}

export interface FetchOptions {
    type: EndpointSuffix;
    data: RequestData;
}

const requestClient: Record<EndpointPrefix, Client> = {
    api: apiClient,
    user: authClient,
    support: supportClient,
}

function parseResponse(response: Response, type: EndpointSuffix) {
    if (type === 'completion') {
        return response.data.completion.choices[0].text;
    }

    if (type === 'speech') {
        return response.data.speech;
    }

    return response.data;
}

export async function useFetch<T>(request: FetchOptions): Promise<FetchResponse<T>> {
    const state: FetchResponse<T> = {
        data: ref(null),
        error: ref(null),
        isFetching: ref(false)
    };

    async function doFetch() {
        const valuesNotToFetch = ['', undefined];

        state.data.value = null;
        state.error.value = null;
        state.isFetching.value = true;

        if (!API_ENDPOINTS.includes(request.type)
            && !AUTH_ENDPOINTS.includes(request.type)
            && !SUPPORT_ENDPOINTS.includes(request.type)
        ) {
            state.error.value = 'Invalid request type';
            return;
        }

        if (
            request.type === 'completion'
            && valuesNotToFetch.includes(request.data.prompt?.value)
        ) {
            return;
        }

        if (
            request.type === 'speech'
            && valuesNotToFetch.includes(request.data.text?.value)
        ) {
            return;
        }

        requestClient[getEndpointBase(request.type)](
                `/${getEndpointBase(request.type)}/${request.type}`,
                request.data
            )
            .then(response => {
                state.data.value = parseResponse(response, request.type) as T;
            })
            .catch(error => {
                state.error.value = error.response?.data || error;
            })
            .finally(() => {
                state.isFetching.value = false;
            });
    }

    if (request.type === 'completion') {
        watch(
            [request.data.prompt],
            doFetch,
            {immediate: true}
        );
    } else if (request.type === 'speech') {
        watch(
            [request.data.text, request.data.lang],
            doFetch,
            {immediate: true}
        );
    } else {
        await doFetch();
    }

    return state;
}
