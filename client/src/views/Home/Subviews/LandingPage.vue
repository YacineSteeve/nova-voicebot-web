<script setup lang="ts">
import { useRouter } from 'vue-router';
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';

const router = useRouter();

function goToNova() {
    router.push('/nova');
}
</script>

<template>
    <div class="landing-page total-center">
        <ButtonWithIcon icon="io-play-circle"
                        icon-scale="1.5"
                        width="10em"
                        title="Get Started"
                        class="btn"
                        @click="goToNova">
            <b>Get Started</b>
        </ButtonWithIcon>
    </div>
</template>

<style scoped lang="scss">
$section-button-padding: calc(100vh - 3 * var(--navbar-height));

.landing-page {
    width: 100%;
    height: 200vh;

    .btn {
        position: absolute;
        top: $section-button-padding;
        font-size: 1.2em;
    }
}
</style>
