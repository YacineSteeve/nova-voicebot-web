<script setup lang="ts">
import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useToast} from 'vue-toastification';
import {useFetch} from '@/hooks/fetch';
import POLICIES, {POLICIES_NAMES} from '@/lib/policies';
import {isFieldError} from '@/lib/client';
import type {AuthError} from '@/lib/client';
import ProgressBar from '@/components/ProgressBar.vue';
import FormWrapper from '@/components/FormWrapper.vue';

interface SignupProps {
    email?: string;
}

const props = defineProps<SignupProps>();
const router = useRouter();
const toast = useToast();

const termsOfUse = POLICIES[POLICIES_NAMES.TERMS_OF_USE].fileContent;

const TOTAL_STEPS = 3;
const currentStep = ref(1);

const email = ref(props.email || '');
const password = ref('');
const passwordConfirmation = ref('');
const agreement = ref(false);

const emailError = ref(false);
const passwordError = ref(false);
const passwordConfirmationError = ref(false);
const agreementError = ref(false)

const emailErrorMessage = ref<string>('Invalid email address');
const passwordErrorMessage = ref<string>('Invalid password');

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const errors = {
    email: emailError,
    password: passwordError
}

const errorMessages = {
    email: emailErrorMessage,
    password: passwordErrorMessage
}

interface SignupResponse {
    success: boolean;
}

function goToTerms() {
    currentStep.value = 2;
}

async function submitUser() {
    if (!agreement.value) {
        agreementError.value = true;
        return;
    }

    if (password.value !== passwordConfirmation.value) {
        passwordConfirmationError.value = true;
        currentStep.value = 1;
        return;
    }

    const {data, error, isFetching} = await useFetch<SignupResponse>({
        type: 'signup',
        data: {
            email: email.value,
            password: password.value
        }
    })

    watch([data, isFetching], () => {
        if (data.value && data.value.success) {
            currentStep.value = 3;

            setTimeout(() => {
                router.push('/user/login');
            }, 2000);
        }
    });

    watch([error], () => {
        if (error.value) {
            const errorInfos = error.value as AuthError;

            if (isFieldError(errorInfos)) {
                errorInfos.fields.forEach(field => {
                    errors[field].value = true;
                    errorMessages[field].value = errorInfos.error.slice(
                        errorInfos.error.lastIndexOf(':') + 1,
                    );
                });

                currentStep.value = 1;
            } else if (errorInfos.error) {
                toast.error(errorInfos.error);
                console.error(errorInfos.error);
            } else {
                toast.error('An error occurred. Please try again later.');
                console.error(errorInfos);
            }

            return;
        }
    });
}

function resetEmailError() {
    emailError.value = false;
    emailErrorMessage.value = 'Invalid email address';
}

function resetPasswordError() {
    passwordError.value = false;
    passwordErrorMessage.value = 'Invalid password';
}

function resetPasswordConfirmationError() {
    passwordConfirmationError.value = false;
}

function resetAgreementError() {
    agreementError.value = false;
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

function togglePasswordConfirmationVisibility() {
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
}
</script>

<template>
    <div class="signup">
        <div class="title total-center">
            Sign Up
        </div>
        <ProgressBar :current-step="currentStep" :total-steps="TOTAL_STEPS"/>
        <form @submit.prevent="goToTerms">
            <div class="page page-1" :class="{current: currentStep === 1}">
                <FormWrapper>
                    <div class="group">
                        <input id="email" type="email" :class="{used: email !== ''}" v-model="email"
                               title="Enter your account email address" @change="resetEmailError" autofocus required>
                        <span class="highlight"></span>
                        <span class="bar" :class="{error: emailError}"></span>
                        <label>Email</label>
                    </div>
                    <div v-if="emailError" class="group-error">
                        {{ emailErrorMessage }}
                    </div>
                    <div class="group">
                        <input id="password" :type="showPassword ? 'text' : 'password'" :class="{used: password !== ''}"
                               v-model="password" title="Enter your password" @change="resetPasswordError" required>
                        <span class="field-icon" @click="togglePasswordVisibility">
                            <v-icon v-if="showPassword" name="fa-eye-slash"/>
                            <v-icon v-else name="fa-eye"/>
                        </span>
                        <span class="highlight"></span>
                        <span class="bar" :class="{error: passwordError}"></span>
                        <label>Password</label>
                    </div>
                    <div v-if="passwordError" class="group-error">
                        {{ passwordErrorMessage }}
                    </div>
                    <div class="group">
                        <input id="confirm-password" :type="showPasswordConfirmation ? 'text' : 'password'"
                               :class="{used: passwordConfirmation !== ''}" v-model="passwordConfirmation"
                               @change="resetPasswordConfirmationError" title="Confirm your password" required>
                        <span class="field-icon" @click="togglePasswordConfirmationVisibility">
                            <v-icon v-if="showPasswordConfirmation" name="fa-eye-slash"/>
                            <v-icon v-else name="fa-eye"/>
                        </span>
                        <span class="highlight"></span>
                        <span class="bar" :class="{error: passwordConfirmationError}"></span>
                        <label>Confirm Password</label>
                    </div>
                    <div v-if="passwordConfirmationError" class="group-error">
                        Passwords don't match
                    </div>
                    <button type="submit" class="submit">
                        Next
                    </button>
                </FormWrapper>
                <div class="redirect-auth">
                    Already have an account?
                    <span>
                        <router-link to="/user/login" title="Log In">Log In</router-link>
                    </span>
                </div>
            </div>
            <div class="page page-2" :class="{current: currentStep === 2}">
                <div class="terms scrolled">
                    {{ termsOfUse }}
                </div>
                <div class="agree">
                    <input type="checkbox" v-model="agreement" :class="{error: agreementError}"
                           @change="resetAgreementError"/>
                    <label>I agree to these terms and conditions</label>
                </div>
                <FormWrapper>
                    <button type="button" class="submit" @click="submitUser">
                        Sign Up
                    </button>
                </FormWrapper>
            </div>
            <div class="page page-3 total-center" :class="{current: currentStep === 3}">
                <v-icon
                    name="io-checkmark-circle"
                    scale="2.5"
                    animation="wrench"
                    speed="slow"
                    color="var(--text-primary)"/>
                <div class="message total-center">
                    Account created successfully!
                    <span>You will be redirected soon...</span>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.signup {
    display: flex;
    flex-direction: column;

    .title {
        font-size: 4em;
        font-weight: 600;
        margin-top: 2em;
        margin-bottom: .5em;
    }

    form {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        margin-block: 3em;
        padding-block: 1em;
        overflow: hidden;

        .page {
            display: none;

            &.current {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-width: 100%;
                animation: spread .5s ease-in-out;

                @keyframes spread {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                &.page-1 {
                    gap: 3em;
                }

                &.page-2 {
                    flex-direction: column;
                    justify-content: space-between;

                    > .terms {
                        font-size: 1.3em;
                        text-align: justify;
                        width: 75%;
                        height: 10em;
                        padding-block: 1em;
                        padding-inline: 1.5em;
                        border: 1px solid black;
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        background: white;
                        color: black;
                        line-height: 1.5em;
                    }

                    .agree {
                        font-size: 1.25em;
                        display: flex;
                        align-items: center;
                        gap: 1em;
                        margin-block: 3em;

                        input {
                            border: 2px solid var(--palette-heliotrope);
                            border-radius: 2px;
                            background: none;
                            cursor: pointer;
                            line-height: 0;
                            outline: 0;
                            padding: 0 !important;
                            vertical-align: text-top;
                            height: 1.45em;
                            width: 1.45em;
                            -webkit-appearance: none;
                            opacity: .5;

                            &.error {
                                border: 2px solid red;
                            }

                            &:checked {
                                background-color: var(--palette-heliotrope);
                                opacity: 1;
                            }

                            &:hover,
                            &:focus {
                                opacity: 1;
                            }
                        }
                    }
                }

                &.page-3 {
                    font-size: 2em;
                    flex-direction: column;
                    gap: 1em;
                    margin-block: 4em;

                    .message {
                        flex-direction: column;
                        gap: .5em;

                        span {
                            font-size: 1em;
                        }
                    }
                }
            }
        }
    }
}
</style>
