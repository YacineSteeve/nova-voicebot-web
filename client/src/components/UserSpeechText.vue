<script setup
        lang="ts">
import {ref} from 'vue';
import {
    useStt,
    isSpeechRecognitionEvent,
    isSpeechRecognitionErrorEvent
} from '@/lib/hooks/speech-to-text';
import {useStore} from '@/store/store';
import {MutationTypes} from '@/store/mutations';

interface UserSpeechTextProps {
    language: string;
}

const props = defineProps<UserSpeechTextProps>();
const store = useStore();

const isRecording = ref<boolean>(false);
const finalTranscript = ref<string>('');
const interimTranscript = ref<string>('');

const recognition = useStt({
    continuous: true,
    interimResults: true,
    lang: props.language,
    eventHandlers: [
        {
            eventName: 'result',
            callback: function (event) {
                if (isSpeechRecognitionEvent(event)) {
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            interimTranscript.value = '';
                            finalTranscript.value += event.results[i][0].transcript;

                            (event.target as SpeechRecognition).stop();

                            if (finalTranscript.value !== '') {
                                store.commit(MutationTypes.CHANGE_USER_TEXT, finalTranscript.value + ' ?');
                            }

                            setTimeout(() => {
                                finalTranscript.value = '';
                            }, 10000);
                        } else {
                            interimTranscript.value = event.results[i][0].transcript;
                        }
                    }
                }
            }
        },
        {
            eventName: 'audiostart',
            callback: function () {
                isRecording.value = true;
            }
        },
        {
            eventName: 'audioend',
            callback: function () {
                isRecording.value = false;
            }
        },
        {
            eventName: 'error',
            callback: function (event) {
                if (isSpeechRecognitionErrorEvent(event)) {
                    console.error(`CLIENT ERROR (${event.error}): ` +
                        `${event.message}`);
                }
            }
        }
    ]
});

function startRecording() {
    store.commit(MutationTypes.CHANGE_RESPONSE_TEXT, '');
    store.commit(MutationTypes.CHANGE_NOVA_STATUS, 'active');
    recognition.start();
}

function stopRecording() {
    recognition.stop();
}

function toggleRecording() {
    if (isRecording.value) {
        stopRecording();
    } else {
        startRecording();
    }
}
</script>

<template>
    <div class="user-speech-text">
        <div class="microphone total-center"
             :class="{recording: isRecording}">
            <v-icon name="fa-microphone"
                    scale="3"
                    @click="toggleRecording"></v-icon>
        </div>
        <div class="transcript-container">
            <div class="call-to-talk"
                 :class="{hidden: isRecording || finalTranscript !== '' || interimTranscript !== ''}">
                <i>{{ store.getters.translationsDictionary.callToTalk }}</i>
            </div>
            <p class="scrolled">
                {{ finalTranscript }}
                <span class="interim">{{ interimTranscript }}</span>
                <span class="cursor"></span>
            </p>
        </div>
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

.user-speech-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    .microphone {
        width: 100%;
        height: 40%;

        :first-child {
            z-index: 2;
            cursor: pointer;
        }

        &.recording {
            &::before {
                position: absolute;
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                box-shadow: 0 0 1px 1px #0000001a;
                background: transparent;
                @include animate(pulse, 2s, linear, infinite);
            }
        }
    }

    @include keyframes(pulse) {
        0% {
            box-shadow: 0 0 0 0 rgba(35, 206, 250, 0.5);
        }
        100% {
            box-shadow: 0 0 0 35px rgba(35, 206, 250, 0);
        }
    }

    .transcript-container {
        position: relative;
        display: flex;
        justify-content: center;
        color: var(--text-primary);
        width: 80%;
        height: 50%;
        max-height: 50%;
        border-radius: 8px;
        background: var(--background-secondary);

        .call-to-talk {
            position: absolute;
            text-align: center;
            opacity: 0.7;
            width: 100%;
            height: fit-content;
            top: 50%;
            bottom: 50%;
            transform: translateY(-50%);

            &.hidden {
                opacity: 0;
            }
        }

        p {
            display: inline-block;
            font-size: 1.2em;
            width: 90%;
            min-height: fit-content;
            max-height: 100%;
            margin-block: 15px;

            span {
                display: inline-block;

                &.interim {
                    color: var(--text-grey);
                }

                &.cursor {
                    top: .2em;
                    width: 2px;
                    height: 1.1em;
                    background: var(--text-primary);
                    @include animate(blink, 2s, step-end, infinite);
                }

                @include keyframes(blink) {
                    from, to {
                        background: transparent;
                    }

                    50% {
                        background: var(--text-primary);
                    }
                }
            }
        }
    }
}
</style>
