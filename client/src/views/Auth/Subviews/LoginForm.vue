<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '@/lib/hooks/fetch';
import cookies from '@/lib/cookies';

const router = useRouter();
const email = ref('');
const password = ref('');

const emailError = ref<boolean>(false);
const passwordError = ref<boolean>(false);

const errors = {
    email: emailError,
    password: passwordError
}

interface Login {
    success: boolean;
    token: string;
}

interface LoginError {
    success: boolean;
    error: string;
    fields?: string[];
}

const isFieldError = (error: LoginError): error is Omit<LoginError, 'fields'> & { fields: string[] } => {
    return error.fields !== undefined;
}

async function submitUser() {
    const { data, error, isFetching } = await useFetch<Login>({
        type: 'login',
        data: {
            email: email.value,
            password: password.value
        }
    });

    watch([data, error, isFetching], () => {
        if (data.value && data.value.success) {
            cookies.set('nova-auth-token', data.value.token, { expires: "30min" });
            router.push('/');

            return;
        }

        if (error.value) {
            const errorInfos = error.value.data as LoginError;

            if (isFieldError(errorInfos)) {
                errorInfos.fields.forEach(field => {
                    errors[field].value = true;
                });
            } else {
                console.error(errorInfos.error);
            }
        }

        if (isFetching.value) {
            console.log(isFetching.value);
        }
    });
}

function resetEmailError() {
    emailError.value = false;
}

function resetPasswordError() {
    passwordError.value = false;
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
            <div class="group">
                <input type="email" :class="{used: email !== '', error: emailError}" v-model="email" @change="resetEmailError" title="Enter your account email address" required>
                <span class="highlight"></span>
                <span class="bar" :class="{error: emailError}"></span>
                <label>Email</label>
            </div>
            <div v-if="emailError" class="group-error">
                Invalid email address
            </div>
            <div class="group">
                <input type="password" :class="{used: password !== '', error: passwordError}" v-model="password" @change="resetPasswordError" title="Enter your password" required>
                <span class="highlight"></span>
                <span class="bar" :class="{error: passwordError}"></span>
                <label>Password</label>
            </div>
            <div v-if="passwordError" class="group-error">
                Wrong password
            </div>
        <button type="submit" class="submit">
                Log In
            </button>
            <div class="redirect-auth">
                Don't have an account?
                <span>
                    <router-link to="/user/signup">Sign Up</router-link>
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
        flex-direction: column;
        gap: 3em;
        width: 50%;
        margin-block: auto;

        .group {
            position: relative;
            font-size: 1.5em;
            width: 100%;
            height: 2.5em;
            background: var(--background-secondary);

            label {
                position: absolute;
                bottom: -0.75em;
                left: 0;
                color: var(--palette-heliotrope);
                pointer-events: none;
                display: block;
                font-size: 1em;
                height: 100%;
                width: 100%;
                padding-left: 0.75em;
                transition: all 0.2s linear;
            }

            input {
                -webkit-appearance: none;
                display: flex;
                align-items: center;
                font-size: 1.2em;
                color: var(--text-primary);
                width: 92%;
                height: 100%;
                margin-inline: auto;
                border: none;
                background: transparent;

                &:focus {
                    outline: none;

                    .highlight {
                        animation: inputHighlighter 0.3s ease;
                    }
                }
            }

            input:focus ~ label,
            input.used ~ label {
                font-size: 0.75em;
                padding-left: 0;
                transform: translateY(-1.75em);
                color: var(--palette-heliotrope);
            }

            input:focus ~ .bar:before,
            input:focus ~ .bar:after,
            input.error ~ .bar:before,
            input.error ~ .bar:after {
                width: 50%;
            }

            .highlight {
                position: absolute;
                height: 60%;
                width: 100px;
                top: 25%;
                left: 0;
                pointer-events: none;
                opacity: 0.5;
            }

            .bar {
                position: relative;
                display: block;
                width: 100%;

                &:before,
                &:after {
                    background: var(--palette-heliotrope);
                }

                &.error {
                    &:before,
                    &:after {
                        background: red;
                    }
                }

                &:before,
                &:after {
                    content: '';
                    height: 2px;
                    width: 0;
                    bottom: 1px;
                    position: absolute;
                    transition: all 0.2s ease;
                }

                &:before {
                    left: 50%;
                }

                &:after {
                    right: 50%;
                }
            }
        }

        .group-error {
            font-size: 1em;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            color: red;
            margin-top: -2em;
        }

        .submit {
            background: var(--palette-heliotrope);
            color: var(--text-secondary);
            font-size: 1.5em;
            font-weight: 600;
            width: 100%;
            height: 2.5em;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;

            &:hover {
                background: var(--palette-electric-violet);
            }
        }
    }
}
</style>
