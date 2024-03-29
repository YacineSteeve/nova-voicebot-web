<script setup
        lang="ts">
import {computed, ref, watch} from 'vue';
import type {Ref} from 'vue';
import {useToast} from 'vue-toastification';
import {useTts} from '@/hooks/text-to-speech';
import {useFetch} from '@/hooks/fetch';
import {useStore} from '@/store/store';
import {MutationTypes} from '@/store/mutations';

const store = useStore();
const toast = useToast();

const isPlaying: Ref<boolean> = ref(false);
const apiRequestText = computed(() => store.state.responseText);
const apiRequestLanguage = computed(() => store.state.language.toLowerCase());

const {data, error, isFetching} = await useFetch<string>({
    type: 'speech',
    data: {
        text: apiRequestText,
        lang: apiRequestLanguage,
    },
});

const apiResponseData = computed(() => data.value);
const apiResponseError = computed(() => error.value);
const apiResponseFetchStatus = computed(() => isFetching.value);

watch(apiResponseError, () => {
    if (apiResponseError.value) {
        toast('Nova cannot speak right now');
        console.error(apiResponseError.value.error);
    }
});

watch(apiResponseData, async () => {
    if (apiResponseData.value && !isPlaying.value) {
        const speech = useTts({
            url: apiResponseData.value,
            eventHandlers: [
                {
                    eventName: 'ended',
                    callback: function handleEnd() {
                        isPlaying.value = false;
                        store.commit(MutationTypes.CHANGE_WARNING_TRIGGERED, false);
                        store.commit(MutationTypes.CHANGE_NOVA_STATUS, 'active');
                    }
                },
                {
                    eventName: 'error',
                    callback: function handleError(event) {
                        toast('Nova cannot speak right now');
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
            isPlaying.value = true;
        } catch (error) {
            toast('Nova cannot speak right now');
            console.error(error);
        }
    }
});

watch(apiResponseFetchStatus, () => {
    store.commit(MutationTypes.UPDATE_FETCH_STATUS, isFetching.value);
});
</script>

<template>
    <div class="nova-mouth">
        <div class="lip left"></div>
        <div v-for="i of 15"
             :key="i"
             class="tooth"
             :class="{animated: isPlaying}"></div>
        <div class="lip right"></div>
    </div>
</template>

<style scoped
       lang="scss">
@mixin animate($animation,$duration,$method,$times) {
    -webkit-animation: $animation $duration $method $times;
    animation: $animation $duration $method $times;
}

@mixin keyframes($name) {
    @keyframes #{$name}{
        @content;
    }
}

$randomHeight: random(5) + em;

.nova-mouth {
    display: flex;
    align-items: flex-end;
    flex-wrap: nowrap;
    gap: 8px;
    width: 250px;
    height: fit-content;

    .tooth,
    .lip {
        flex: 1;
        height: .5em;
        border-radius: 1px;
        background: white;
    }

    .tooth {
        &.animated {
            @include animate(stretch, .6s, linear, infinite);
        }

        @for $i from 1 through 15 {
            &.animated:nth-child(#{$i}) {
                animation-delay: random($i) * 0.07s;
            }
        }

        @include keyframes(stretch) {
            0% {
                transform: scaleY(1);
            }
            50% {
                transform: scaleY(7);
            }
            100% {
                transform: scaleY(1);
            }
        }
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
