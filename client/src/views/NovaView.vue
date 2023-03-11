<script setup
        lang="ts">
import { computed, ref, watch, onBeforeMount } from 'vue';
import type {Ref} from 'vue';
import cookies from '@/lib/cookies';
import type { User } from '@/lib/client';
import { useFetch } from '@/lib/hooks/fetch';
import { useStore } from '@/store/store';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
import ThemeToggleButton from '@/components/ThemeToggleButton.vue';
import NovaEye from '@/components/NovaEye.vue';
import ContextBloc from '@/components/ContextBloc.vue';
import NovaMouth from '@/components/NovaMouth.vue';
import UserSpeechText from '@/components/UserSpeechText.vue';
import ResponseText from '@/components/ResponseText.vue';
import LanguagePicker from '@/components/LanguagePicker.vue';

const store = useStore();

const novaStatus = computed(() => store.state.novaStatus);
const currentLanguage = computed(() => store.state.language);

const languagesVisible: Ref<boolean> = ref(false);

const userToken = cookies.get('nova-auth-token') || ''
const userEmail: Ref<string> = ref(userToken);

onBeforeMount(async () => {
    interface UserResponse {
        success: boolean;
        user: User;
    }

    const { data, error, isFetching } = await useFetch<UserResponse>({
        type: 'userinfo',
        data: {
            token: userToken
        }
    });

    watch([data, error, isFetching], () => {
        if (data.value && data.value.success) {
            userEmail.value = data.value.user.email;
        }

        if (error.value) {
            console.error(error.value);
        }
    });
})

function toggleLanguagesVisibility() {
    languagesVisible.value = !languagesVisible.value;
}

function hideLanguages() {
    languagesVisible.value = false;
}
</script>

<template>
    <div class="nova-view">
        <div class="button-section left">
            <router-link to="/"
                         replace
                         title="Close Nova">
                <ButtonWithIcon icon="hi-chevron-left"
                                width="100%">
                    Exit
                </ButtonWithIcon>
            </router-link>
        </div>
        <div class="glass-card">
            <div class="nova-face eyes">
                <NovaEye :state="novaStatus" />
                <NovaEye :state="novaStatus" />
            </div>
            <div class="nova-face mouth total-center">
                <Suspense>
                    <NovaMouth/>
                </Suspense>
            </div>
            <div class="nova-context">
                <context-bloc>
                    <UserSpeechText :language="currentLanguage"
                                    :key="currentLanguage"/>
                </context-bloc>
                <context-bloc class="total-center">
                    <Suspense>
                        <ResponseText :user="userEmail"/>
                    </Suspense>
                </context-bloc>
            </div>
        </div>
        <div class="button-section right">
            <ThemeToggleButton width="60%"/>
            <ButtonWithIcon icon="io-language"
                            width="60%"
                            title="Language"
                            @click="toggleLanguagesVisibility">
                Language
            </ButtonWithIcon>
            <div class="languages"
                 :class="{hidden: !languagesVisible}">
                <v-icon name="hi-chevron-down"></v-icon>
                <LanguagePicker width="100%"
                                @language-picked="hideLanguages"/>
            </div>
            <ButtonWithIcon icon="md-report-round"
                            width="60%"
                            title="Report">
                Report abuse
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

        &.right {
            .languages {
                display: flex;
                flex-direction: column;
                gap: 1vh;
                align-items: center;
                width: 80%;
            }

            > *:last-child {
                margin-top: auto;
            }
        }
    }

    .glass-card {
        width: 70%;
        height: $view-height;
        background: var(--palette-blue-gem);
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
