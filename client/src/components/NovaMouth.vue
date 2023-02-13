<script setup
        lang="ts">
import {computed, watch} from 'vue';
import {useTts} from '@/lib/hooks/text-to-speech';
import {useFetch} from '@/lib/hooks/fetch';
import {useStore} from '@/store/store';
import {MutationTypes} from '@/store/mutations';

const store = useStore();

const apiRequestText = computed(() => store.state.responseText);
const apiRequestLanguage = computed(() => store.getters.truncatedLanguageCode);

const {data, error, isFetching} = await useFetch({
    type: 'speech',
    text: apiRequestText,
    lang: apiRequestLanguage
});

const apiResponseData = computed(() => data.value);
const apiResponseError = computed(() => error.value);
const apiResponseFetchStatus = computed(() => isFetching.value);

watch(apiResponseData, async () => {
    if (apiResponseData.value) {
        const speech = useTts({
            url: apiResponseData.value,
            eventHandlers: [
                {
                    eventName: 'ended',
                    callback: function handleEnd() {
                        store.commit(MutationTypes.CHANGE_WARNING_TRIGGERED, false);
                        store.commit(MutationTypes.CHANGE_NOVA_STATUS, 'active');
                    }
                },
                {
                    eventName: 'error',
                    callback: function handleError(event) {
                        console.error(`CLIENT ERROR (code-${this.error?.code}): ` +
                            `Unable to play ${event.target}\n` +
                            `${this.error?.message}`);
                    }
                }
            ]
        });

        try {
            speech.pause();
            await speech.play();
        } catch (error) {
            console.error(error);
        }
    }
});

watch(apiResponseError, () => {
    if (apiResponseError.value) {
        console.error(apiResponseError.value);
    }
});

watch(apiResponseFetchStatus, () => {
    store.commit(MutationTypes.UPDATE_FETCH_STATUS, isFetching.value);
});
</script>

<template>
    <div class="nova-mouth">
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
