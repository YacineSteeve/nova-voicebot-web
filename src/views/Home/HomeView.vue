<script setup
        lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <div class="home">
        <NavBar />
        <section>
            <router-view />
        </section>
    </div>
</template>

<style scoped
       lang="scss">
$section-margin: calc(0.4 * var(--navbar-height));

.home {
    width: 100%;
    min-height: 100vh;
    
    section {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: $section-margin;
        margin-inline: $section-margin;
        min-height: 100vh;
        height: fit-content;
        background: var(--palette-blue-gem);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
}
</style>
