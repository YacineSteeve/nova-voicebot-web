<script setup lang="ts">
import { ref } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';

const TOTAL_STEPS = 3;
const currentStep = ref(1);
</script>

<template>
    <div class="signup">
        <div class="title total-center">
            Sign Up
        </div>
        <ProgressBar :current-step="currentStep" :total-steps="TOTAL_STEPS" />
        <div class="redirect-auth">
            Already have an account?
            <span>
                <router-link to="/user/login">Log In</router-link>
            </span>
        </div>
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
    }
}
</style>
