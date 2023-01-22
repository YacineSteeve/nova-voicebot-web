<script setup
        lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    import ThemeToggleButton from '@/components/ThemeToggleButton.vue';
    import NovaEye from '@/components/NovaEye.vue';
    import ContextBloc from '@/components/ContextBloc.vue';
    import NovaMouth from '@/components/NovaMouth.vue';
    import UserSpeechText from '@/components/UserSpeechText.vue';
    import ResponseText from '@/components/ResponseText.vue';
    
    const userText: Ref<string> = ref('');
    const novaText: Ref<string> = ref('');
    const novaState: Ref<string> = ref('sleeping');
    let awaken = false;
    
    // To be changed (coming feature)
    const userName: string = 'YacineSteeve';
    
    function wakeUpNova() {
        novaState.value = 'active';
        awaken = true;
    }
    
    function updateUserText(newText: string) {
        if (newText != '') {
            userText.value = newText + ' ?';
        }
    }
    
    function changeFetchStatus(state: boolean) {
        novaState.value = awaken
            ? state
                ? 'loading'
                : 'active'
            : 'sleeping';
    }
    
    function readResponse(text: string) {
        novaText.value = text;
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
                <Suspense>
                    <NovaMouth :message="novaText"
                               :key="novaText" />
                </Suspense>
            </div>
            <div class="nova-context">
                <context-bloc>
                    <UserSpeechText @wake-up-nova="wakeUpNova"
                                    @update-user-text="updateUserText" />
                </context-bloc>
                <context-bloc class="total-center">
                    <Suspense>
                        <ResponseText :prompt="userText"
                                      @change-fetch-status="changeFetchStatus"
                                      @response-fetched="readResponse"
                                      :key="userText" />
                    </Suspense>
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
        }
    }
}
</style>
