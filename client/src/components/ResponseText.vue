<script setup
        lang="ts">
    import { computed, ref, watch } from 'vue';
    import type { Ref } from 'vue';
    import { useFetch } from '@/lib/hooks/fetch';
    
    interface ResponseTextProps {
        prompt: string;
    }
    
    interface ResponseTextEmits {
        (e: 'changeFetchStatus', value: boolean): void;
    }
    
    const props = defineProps<ResponseTextProps>();
    const emit = defineEmits<ResponseTextEmits>();
    
    const apiRequest: Ref<string> = ref(props.prompt);
    const {data, error, isFetching} = useFetch(apiRequest);
    const apiResponseData = computed(() => {
        return data.value ? data.value.toString() : '';
    });
    
    watch(isFetching, () => {
        emit('changeFetchStatus', isFetching.value);
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
    background: var(--background-secondary);
    
    p {
        font-size: 1.2em;
        line-height: 1.5em;
        width: 90%;
        height: 90%;
        overflow-x: hidden;
    }
}
</style>
