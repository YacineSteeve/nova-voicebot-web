<script setup
        lang="ts">
    import { computed, ref, watch } from 'vue';
    import type { ComputedRef, Ref } from 'vue';
    import { useFetch } from '@/lib/hooks/fetch';
    import type { FetchOptions } from '@/lib/hooks/fetch';
    
    interface ResponseTextProps {
        prompt: string;
    }
    
    interface ResponseTextEmits {
        (e: 'changeFetchStatus', value: boolean): void;
        
        (e: 'responseFetched', text: string): void;
    }
    
    const props = defineProps<ResponseTextProps>();
    const emit = defineEmits<ResponseTextEmits>();
    
    const apiRequest: FetchOptions = {
        type: 'completion',
        prompt: ref(props.prompt)
    };
    const {data, error, isFetching} = await useFetch<string>(apiRequest);
    const apiResponseData: ComputedRef<string> = computed(() => {
        return data.value ? data.value.toString().trim() : '';
    });
    
    watch(isFetching, () => {
        emit('changeFetchStatus', isFetching.value);
        
        if (!isFetching.value && apiResponseData.value) {
            emit('responseFetched', apiResponseData.value);
        }
    }, {immediate: true});
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
        overflow-x: hidden;
        background: var(--background-secondary-transparent);
    }
}
</style>
