<script setup
        lang="ts">
    import { computed, ref } from 'vue';
    import { useTts } from '@/lib/hooks/text-to-speech';
    import { FetchOptions, useFetch } from '@/lib/hooks/fetch';
    
    interface NovaMouthProps {
        message: string;
    }
    
    const props = defineProps<NovaMouthProps>();
    
    const apiRequest: FetchOptions = {
        type: 'speech',
        text: ref(props.message)
    };
    const {data, error, isFetching} = await useFetch<ArrayBuffer>(apiRequest);
    const apiResponseData: ComputedRef<ArrayBuffer | null> = computed(() => {
        return data.value ? data.value : null;
    });
    
    function playSound() {
        if (!isFetching.value) {
            const speech = useTts({data: apiResponseData.value});
            
            console.log('apiResponseData', apiResponseData);
            console.log('speech', speech);
            
            speech.start();
        }
    }
</script>

<template>
    <div class="nova-mouth"
         @click="playSound">
        <div class="lip left"></div>
        <div v-for="i of 20"
             class="tooth"
             :key="i"></div>
        <div class="lip right"></div>
    </div>
</template>

<style scoped
       lang="scss">
.nova-mouth {
    display: flex;
    align-items: end;
    flex-wrap: nowrap;
    gap: 3px;
    width: 250px;
    height: fit-content;
    
    .tooth,
    .lip {
        flex: 1;
        height: .5em;
        border-radius: 2px;
        background: white;
    }
    
    .lip {
        &.left {
            height: 1.75em;
            transform: rotate(-40deg) translateX(-.5em);
        }
        
        &.right {
            height: 1.75em;
            transform: rotate(40deg) translateX(.5em);
        }
    }
    
    button {
        visibility: hidden;
        height: 0;
    }
}
</style>
