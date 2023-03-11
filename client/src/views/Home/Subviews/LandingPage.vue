<script setup lang="ts">
import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
</script>

<template>
    <div class="landing-page total-center">
        <router-link to="/nova"
                     class="btn">
            <ButtonWithIcon icon="io-play-circle"
                            icon-scale="1.5"
                            width="10em"
                            title="Get Started">
                <b>Get Started</b>
            </ButtonWithIcon>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
$section-button-padding: calc(100vh - 3 * var(--navbar-height));

.landing-page {
    position: relative;
    width: 100%;
    height: 200vh;

    .btn {
        position: absolute;
        top: $section-button-padding;
        font-size: 1.2em;
    }
}
</style>
