<script setup
        lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    import ThemeToggleButton from '@/components/ThemeToggleButton.vue';
    import NovaEye from '@/components/NovaEye.vue';
    import ContextBloc from '@/components/ContextBloc.vue';
    import NovaMouth from '@/components/NovaMouth.vue';
    
    const userText: Ref<string> = ref('');
    const apiResponse: Ref = ref(null);
    const novaState: Ref<string> = ref('active');
    const userName: string = 'YacineSteeve';
    
    function doFetch() {
        novaState.value = ['active', 'sleeping', 'loading', 'warning'][Math.floor(Math.random() * 4)];
        fetch('http://localhost:8000/api/')
            .then(response => {
                response.json().then(
                    json => apiResponse.value = json.choices[0].text
                );
            })
            .catch(error => {
                apiResponse.value = error;
                console.log(error);
            });
    }
</script>

<template>
    <div class="nova-view">
        <div class="button-section left">
            <router-link to="/"
                         title="Close Nova">
                <ButtonWithIcon icon="pr-chevron-left"
                                width="100%">
                    Exit
                </ButtonWithIcon>
            </router-link>
        </div>
        <div class="glass-card">
            <div class="nova-face eyes">
                <NovaEye :state="novaState"
                         :userName="userName" />
                <NovaEye :state="novaState"
                         :userName="userName" />
            </div>
            <div class="nova-face mouth total-center">
                <NovaMouth />
            </div>
            <div class="nova-context">
                <context-bloc>
                    <div class="microphone recording total-center">
                        <v-icon name="fa-microphone"
                                scale="3"></v-icon>
                    </div>
                    <div class="transcript-container">
                        <p class="transcript scrolled">
                            {{ userText }}
                            <span></span>
                        </p>
                    </div>
                </context-bloc>
                <context-bloc>
                    <div>
                        <input type="text"
                               v-model="userText">
                        <button @click="doFetch">Send</button>
                        <p>
                            {{ apiResponse }}
                        </p>
                    </div>
                </context-bloc>
            </div>
        </div>
        <div class="button-section right">
            <ThemeToggleButton width="60%" />
            <ButtonWithIcon icon="pr-sliders-h"
                            width="60%"
                            title="Settings">
                Settings
            </ButtonWithIcon>
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

$view-height: 90vh;

.nova-view {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    
    .button-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 5vh;
        width: 15%;
        height: $view-height;
        
        &.left {
            > * {
                min-width: 35%;
            }
        }
    }
    
    .glass-card {
        width: 70%;
        height: $view-height;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        
        .nova-face {
            &.eyes {
                display: flex;
                align-items: end;
                justify-content: center;
                gap: 75px;
                width: 100%;
                height: 30%;
            }
            
            &.mouth {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 30%;
            }
        }
        
        .nova-context {
            display: flex;
            width: 100%;
            height: 40%;
            
            :first-child {
                display: flex;
                flex-direction: column;
                align-items: center;
                
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
                        overflow-x: hidden;
                        
                        span {
                            display: inline-block;
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
            
            :last-child {
                
            }
        }
    }
}
</style>
