<script setup
        lang="ts">
import {ref, watch} from 'vue';
import {POSITION, useToast} from 'vue-toastification';
import {useFetch} from '@/hooks/fetch';
import cookies from '@/lib/cookies';
import {isFieldError} from '@/lib/client';
import type {User, DeleteResponse, ResponseError} from '@/lib/client';
import FormWrapper from '@/components/FormWrapper.vue';

interface NavBarDeleteFormProps {
    user: User;
    onDeleted: () => void;
    onCanceled: () => void;
}

const props = defineProps<NavBarDeleteFormProps>();
const toast = useToast();

const password = ref<string>('');
const passwordError = ref<boolean>(false);
const passwordErrorMessage = ref<string>('Invalid password');
const showPassword = ref<boolean>(false);

function resetPasswordError() {
    passwordError.value = false;
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

async function deleteAccount() {
    const {data, error} = await useFetch<DeleteResponse>({
        type: 'delete',
        data: {
            token: cookies.get('nova-auth-token') || '',
            password: password.value
        }
    });

    watch([data], () => {
        if (data.value && data.value.success) {
            toast.success(`Account with email '${props.user.email}' deleted successfully!`, {
                position: POSITION.TOP_CENTER,
                timeout: 5000,
                hideProgressBar: true,
            });
            setTimeout(() => {
                props.onDeleted();
            }, 4000);
        }
    });

    watch([error], () => {
        if (error.value) {
            const errorInfos = error.value as ResponseError;

            if (isFieldError(errorInfos)) {
                passwordError.value = true;
                passwordErrorMessage.value = errorInfos.error.slice(
                        errorInfos.error.lastIndexOf(':') + 1,
                    );
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
</script>

<template>
    <div class="delete-account">
        <h1 class="total-center">Delete Account</h1>
        <div class="message total-center">
            <p>Are you sure you want to delete your account?</p>
            <p class="warning">This action cannot be undone.</p>
        </div>
        <form @submit.prevent="deleteAccount" class="total-center">
            <FormWrapper>
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
                    {{ passwordErrorMessage }}
                </div>
                <button type="submit" class="submit delete">
                    Delete
                </button>
                <button type="button" class="submit" @click="props.onCanceled">
                    Cancel
                </button>
            </FormWrapper>
        </form>
    </div>
</template>

<style scoped
       lang="scss">
.delete-account {
    width: 35vw;
    padding-block: 1em;
    color: var(--text-primary);
    background: var(--background-primary);

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .message {
        font-size: 1.5em;
        flex-direction: column;
        line-height: 1.2em;
        margin-bottom: 2rem;

        p.warning {
            font-weight: bold;
            color: red;
        }
    }

    form {
        width: 100%;
    }
}
</style>
