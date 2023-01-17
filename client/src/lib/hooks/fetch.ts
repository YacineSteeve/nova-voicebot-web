import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import novaApi from '@/lib/client';

export interface FetchResponse {
    data: Ref<string | null>;
    error: Ref;
    isFetching: Ref<boolean>;
}

export function useFetch(request: Ref<string>) {
    const state: FetchResponse = {
        data: ref(null),
        error: ref(null),
        isFetching: ref(false)
    };

    async function doFetch() {
        if (request.value != '') {
            state.data.value = null;
            state.error.value = null;
            state.isFetching.value = true;

            novaApi.get('/', {
                    params: {
                        prompt: request.value
                    }
                })
                .then(response => {
                    state.isFetching.value = false;
                    state.data.value = response.data.choices[0].text;
                })
                .catch(error => {
                    state.isFetching.value = false;
                    state.error.value = error;
                });
        }
    }

    watch(() => request, doFetch, {immediate: true});

    return state;
}
