<script setup
        lang="ts">
import {computed, watch} from 'vue';
import {useFetch} from '@/lib/hooks/fetch';
import {useStore} from '@/store/store';
import {MutationTypes} from '@/store/mutations';

interface ResponseTextProps {
    user: string;
}

const props = defineProps<ResponseTextProps>();

const store = useStore();

const responseText = computed(() => store.state.responseText);
const apiRequestPrompt = computed(() => store.state.userText);

const {data, error, isFetching} = await useFetch<string>({
    type: 'completion',
    prompt: apiRequestPrompt,
    user: props.user
});

const apiResponseData = computed(() => {
    return data.value ? data.value.toString().trim() : '';
});
const apiResponseFetchStatus = computed(() => isFetching.value);
const apiResponseError = computed(() => error.value);

watch([apiResponseData, apiResponseError, apiResponseFetchStatus], () => {
    store.commit(MutationTypes.UPDATE_FETCH_STATUS, isFetching.value);

    if (apiResponseData.value) {
        store.commit(MutationTypes.CHANGE_RESPONSE_TEXT, apiResponseData.value);
    }

    if (apiResponseError.value && apiResponseError.value.response?.status === 400) {
        const violationCategories: string[] = apiResponseError.value.response.data.categories;
        let message = 'Sorry, your request cannot be processed due to policy violation.' +
            'The content detected in your request is ' +
            `${violationCategories.join(', ')}.`;

        store.commit(MutationTypes.CHANGE_WARNING_TRIGGERED, true);
        store.commit(MutationTypes.CHANGE_RESPONSE_TEXT, message);
    }
});
</script>

<template>
    <div class="response-text total-center">
        <p class="scrolled">
            {{ responseText }}
        </p>
    </div>
</template>

<style scoped
       lang="scss">
.response-text {
    color: var(--text-primary);
    width: 90%;
    height: 90%;
    max-height: 90%;
    border-radius: 8px;
    background-color: var(--background-secondary);
    background-image: url('@/assets/logo.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 25%;

    p {
        font-size: 1.2em;
        line-height: 1.5em;
        width: 90%;
        height: 90%;
        background: var(--background-secondary-transparent);
    }
}
</style>
