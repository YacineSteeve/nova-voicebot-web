<script setup lang="ts">
import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useToast} from 'vue-toastification';
import {useFetch} from '@/hooks/fetch';
import {isFieldError} from '@/lib/client';
import type {AuthError} from '@/lib/client';
import cookies from '@/lib/cookies';
import FormWrapper from '@/components/FormWrapper.vue';

const router = useRouter();
const toast = useToast();

const email = ref<string>('');
const password = ref<string>('');

const emailError = ref<boolean>(false);
const passwordError = ref<boolean>(false);

const showPassword = ref<boolean>(false);

const errors = {
    email: emailError,
    password: passwordError
}

const errorMessages = {
    email: 'Invalid email address',
    password: 'Wrong password'
}

interface LoginResponse {
    success: boolean;
    token: string;
}

async function submitUser() {
    const {data, error, isFetching} = await useFetch<LoginResponse>({
        type: 'login',
        data: {
            email: email.value,
            password: password.value
        }
    });

    watch([data, isFetching], () => {
        if (data.value && data.value.success) {
            cookies.set(
                'nova-auth-token',
                data.value.token,
                {expires: "30min", secure: true}
            );
            router.push('/');

            return;
        }
    });

    watch([error], () => {
        if (error.value) {
            const errorInfos = error.value as AuthError;

            if (isFieldError(errorInfos)) {
                errorInfos.fields.forEach(field => {
                    errors[field].value = true;
                });
            } else if (errorInfos.error) {
                toast.error(errorInfos.error);
                console.error(errorInfos.error);
            } else {
                toast.error('An error occurred. Please try again later.');
                console.error(errorInfos);
            }
        }
    });
}

function resetEmailError() {
    emailError.value = false;
}

function resetPasswordError() {
    passwordError.value = false;
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}
</script>

<template>
    <div class="login total-center">
        <div class="title total-center">
            Log In
        </div>
        <div class="welcome-message">
            Glad to see you again!
        </div>
        <form @submit.prevent="submitUser">
            <FormWrapper>
                <div class="group">
                    <input id="email" type="email" :class="{used: email !== '', error: emailError}" v-model="email"
                           @change="resetEmailError" title="Enter your account email address" autofocus required>
                    <span class="highlight"></span>
                    <span class="bar" :class="{error: emailError}"></span>
                    <label>Email</label>
                </div>
                <div v-if="emailError" class="group-error">
                    {{ errorMessages.email }}
                </div>
                <div class="group">
                    <input id="password" :type="showPassword ? 'text' : 'password'"
                           :class="{used: password !== '', error: passwordError}" v-model="password"
                           @change="resetPasswordError" title="Enter your password" required>
                    <span class="field-icon" @click="togglePasswordVisibility">
                        <v-icon v-if="showPassword" name="fa-eye-slash"/>
                        <v-icon v-else name="fa-eye"/>
                    </span>
                    <span class="highlight"></span>
                    <span class="bar" :class="{error: passwordError}"></span>
                    <label>Password</label>
                </div>
                <div v-if="passwordError" class="group-error">
                    {{ errorMessages.password }}
                </div>
                <button type="submit" class="submit">
                    Log In
                </button>
            </FormWrapper>
            <div class="redirect-auth">
                Don't have an account?
                <span>
                    <router-link to="/user/signup" title="Sign Up">Sign Up</router-link>
                </span>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.login {
    flex-direction: column;
    flex: 1;
    width: 100%;

    .title {
        font-size: 4em;
        font-weight: 600;
        margin-top: 2em;
    }

    .welcome-message {
        font-size: 1.75em;
        font-weight: lighter;
        margin-top: 3em;
    }

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 3em;
        width: 100%;
        margin-block: auto;
    }
}
</style>
