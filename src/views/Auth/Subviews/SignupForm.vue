<script setup lang="ts">
import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useToast, POSITION} from 'vue-toastification';
import {useFetch} from '@/hooks/fetch';
import {POLICIES_NAMES} from '@/lib/policies';
import type {ResponseError, SignupResponse} from '@/lib/client';
import {isFieldError} from '@/lib/client';
import FormWrapper from '@/components/FormWrapper.vue';
import LegalStuffToasted from '@/components/LegalStuffToasted.vue';

interface SignupProps {
    email?: string;
}

const props = defineProps<SignupProps>();
const router = useRouter();
const toast = useToast();

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

async function submitUser() {
    if (!agreement.value) {
        agreementError.value = true;
        return;
    }

    if (password.value !== passwordConfirmation.value) {
        passwordConfirmationError.value = true;
        return;
    }

    const {data, error} = await useFetch<SignupResponse>({
        type: 'signup',
        data: {
            email: email.value,
            password: password.value
        }
    })

    watch([data], () => {
        if (data.value && data.value.success) {
            toast.success(
                'Account created successfully ! \n You will be redirected to the login page.',
                {
                    position: POSITION.TOP_CENTER,
                    timeout: 3000,
                });
            setTimeout(() => {
                router.push('/user/login');
            }, 3000);
        }
    });

    watch([error], () => {
        if (error.value) {
            const errorInfos = error.value as ResponseError;

            if (isFieldError(errorInfos)) {
                errorInfos.fields.forEach(field => {
                    errors[field].value = true;
                    errorMessages[field].value = errorInfos.error.slice(
                        errorInfos.error.lastIndexOf(':') + 1,
                    );
                });
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
        <form @submit.prevent="submitUser">
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
            </FormWrapper>
            <div class="agree">
                <input type="checkbox"
                       v-model="agreement"
                       :class="{error: agreementError}"
                       @change="resetAgreementError"/>
                <label>
                    I agree to your
                    <LegalStuffToasted :policy-name="POLICIES_NAMES.TERMS_OF_USE">
                        Terms of Service
                    </LegalStuffToasted>
                    &nbsp;and
                    <LegalStuffToasted :policy-name="POLICIES_NAMES.PRIVACY_POLICY">
                        Privacy Policy
                    </LegalStuffToasted>
                </label>
            </div>
            <FormWrapper>
                <button type="submit" class="submit" :disabled="!agreement">
                    Sign Up
                </button>
            </FormWrapper>
            <div class="redirect-auth">
                Already have an account?
                <span>
                    <router-link to="/user/login" title="Log In">Log In</router-link>
                </span>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.signup {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
        font-size: 4em;
        font-weight: 600;
        margin-top: 2em;
        margin-bottom: .5em;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 3em;
        align-items: center;
        justify-content: center;
        min-width: 100%;
        width: 100%;
        margin-block: 3em;
        padding-block: 1.5em;
        overflow: hidden;

        .agree {
            font-size: 1.25em;
            display: flex;
            align-items: center;
            gap: 1em;
            margin-block: 2em;

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
                    background: var(--palette-heliotrope);
                    opacity: 1;
                }

                &:hover,
                &:focus {
                    opacity: 1;
                }
            }

            label {
                span {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
