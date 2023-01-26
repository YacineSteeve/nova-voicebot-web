<script setup
        lang="ts">
    import { computed, watch } from 'vue';
    import { useFetch } from '@/lib/hooks/fetch';
    import { useStore } from '@/store/store';
    import { MutationTypes } from '@/store/mutations';
    
    const store = useStore();
    
    const apiRequestPrompt = computed(() => store.state.userText);
    
    const {data, error, isFetching} = await useFetch({
        type: 'completion',
        prompt: apiRequestPrompt
    });
    
    const apiResponseData = computed(() => {
        return data.value ? data.value.toString().trim() : '';
    });
    const apiResponseFetchStatus = computed(() => isFetching.value);
    
    watch(apiResponseFetchStatus, () => {
        store.commit(MutationTypes.UPDATE_FETCH_STATUS, isFetching.value);
    });
    
    watch(apiResponseData, () => {
        if (apiResponseData.value) {
            store.commit(MutationTypes.CHANGE_RESPONSE_TEXT, apiResponseData.value);
        }
    });
</script>

<template>
    <div class="response-text total-center">
        <p class="scrolled">
            {{ apiResponseData }}
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
