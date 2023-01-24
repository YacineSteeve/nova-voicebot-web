<script setup
        lang="ts">
    import { ref } from 'vue';
    import { useStt } from '@/lib/hooks/speech-to-text';
    import type { RecognitionEvent } from '@/lib/hooks/speech-to-text';
    
    interface UserSpeechTextProps {
        language: string;
    }
    
    interface UserSpeechTextEmits {
        (e: 'updateUserText', value: string): void;
        
        (e: 'wakeUpNova'): void;
    }
    
    const props = defineProps<UserSpeechTextProps>();
    const emit = defineEmits<UserSpeechTextEmits>();
    
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
                callback: function <RecognitionEvent>(event) {
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            interimTranscript.value = '';
                            finalTranscript.value += event.results[i][0].transcript;
                            
                            event.target.stop();
                            emit('updateUserText', finalTranscript.value);
                            
                            setTimeout(() => {
                                finalTranscript.value = '';
                            }, 10000);
                        } else {
                            interimTranscript.value = event.results[i][0].transcript;
                        }
                    }
                }
            },
            {
                eventName: 'audiostart',
                callback: function <RecognitionEvent>(event) {
                    isRecording.value = true;
                }
            },
            {
                eventName: 'audioend',
                callback: function <RecognitionEvent>(event) {
                    isRecording.value = false;
                }
            }
        ]
    });
    
    function startRecording() {
        recognition.start();
        emit('wakeUpNova');
    }
</script>

<template>
    <div class="user-speech-text">
        <div class="microphone total-center"
             :class="{recording: isRecording}">
            <v-icon name="fa-microphone"
                    scale="3"
                    @click="startRecording"></v-icon>
        </div>
        <div class="transcript-container">
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
        display: flex;
        justify-content: center;
        color: var(--text-primary);
        width: 80%;
        height: 50%;
        max-height: 50%;
        border-radius: 8px;
        background: var(--background-secondary);
        
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
