<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormWrapper from '@/components/FormWrapper.vue';

const router = useRouter();
const email = ref('');

function redirectToSignup() {
    router.push({
        name: 'Signup',
        query: {
            email: email.value
        }
    });
    email.value = '';
}
</script>

<template>
    <form class="center-start" @submit.prevent="redirectToSignup">
        <FormWrapper>
            <div class="group">
                <input id="footer-email" type="email" :class="{used: email !== ''}" v-model="email" title="Enter your account email address" autofocus required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Email</label>
            </div>
        </FormWrapper>
        <button type="submit" class="submit">Register</button>
    </form>
</template>

<style scoped lang="scss">
form {
    flex-direction: row;
    gap: 1em;
    width: 100%;
    height: fit-content;
    margin-block: 2em;

    .submit {
        background: var(--palette-heliotrope);
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text-secondary);
        height: 2.5em;
        padding-inline: 2em;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;

        &:hover {
            background: var(--palette-electric-violet);
        }
    }
}
</style>
