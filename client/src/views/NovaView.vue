<script setup
        lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    import ThemeToggleButton from '@/components/ThemeToggleButton.vue';
    import NovaEye from '@/components/NovaEye.vue';
    import ContextBloc from '@/components/ContextBloc.vue';
    
    const userText: Ref<string> = ref('');
    const apiResponse: Ref = ref(null);
    const novaState: Ref<string> = ref('active');
    const userName: string = 'YacineSteeve';
    
    function doFetch() {
        novaState.value = ['active', 'sleeping', 'loading', 'warning'][Math.floor(Math.random() * 4)];
        fetch('http://localhost:8000/api/')
            .then(response => {
                response.json().then(
                    json => apiResponse.value = json
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
            <div class="nova-face">
                <NovaEye :state="novaState"
                         :userName="userName" />
                <NovaEye :state="novaState"
                         :userName="userName" />
            </div>
            <div class="nova-mouth total-center">
                <input type="text"
                       v-model="userText">
                <button @click="doFetch">Send</button>
                <p>{{ apiResponse }}</p>
            </div>
            <div class="nova-context">
                <context-bloc>
                
                </context-bloc>
                <context-bloc></context-bloc>
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
            display: flex;
            align-items: end;
            justify-content: center;
            gap: 100px;
            width: 100%;
            height: 30%;
        }
        
        .nova-mouth {
            width: 100%;
            height: 30%;
        }
        
        .nova-context {
            display: flex;
            width: 100%;
            height: 40%;
        }
    }
}
</style>
