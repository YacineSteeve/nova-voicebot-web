import {ref, watch} from 'vue';
import type {Ref} from 'vue';
import {novaApi} from '@/lib/client';
import type {ApiResponse} from '@/lib/client';

type ApiEndPoint = 'completion' | 'speech';

export interface FetchResponse {
    data: Ref<string | null>;
    error: Ref;
    isFetching: Ref<boolean>;
}

export interface FetchOptions {
    type: ApiEndPoint,
    prompt?: Ref<string>;
    text?: Ref<string>
    lang?: Ref<string>
}

function parseResponse(response: ApiResponse, type: ApiEndPoint): string | null {
    if (type === 'completion') {
        return response.data.choices[0].text;
    } else if (type === 'speech') {
        return response.data.speech;
    }
    return null;
}

export async function useFetch(request: FetchOptions): Promise<FetchResponse> {
    const state: FetchResponse = {
        data: ref(null),
        error: ref(null),
        isFetching: ref(false)
    };

    async function doFetch() {
        if (request.prompt?.value || request.text?.value) {
            state.data.value = null;
            state.error.value = null;
            state.isFetching.value = true;

            novaApi.get(`/${request.type}`, {
                params: {
                    prompt: request.prompt?.value,
                    text: request.text?.value,
                    lang: request.lang?.value
                }
            })
                .then(response => {
                    state.isFetching.value = false;
                    state.data.value = parseResponse(response, request.type);
                })
                .catch(error => {
                    state.isFetching.value = false;
                    state.error.value = error;
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
    }


    return state;
}
