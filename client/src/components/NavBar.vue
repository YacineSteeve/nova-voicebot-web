<script setup
        lang="ts">
    import ThemeToggleButton from '@/components/ThemeToggleButton.vue';
</script>

<template>
    <div class="navbar">
        <div class="logo total-center">
            <img src="/logo.svg"
                 alt="Logo">
            &nbsp;
            <h1>OVA</h1>
        </div>
        <div class="menu">
        </div>
        <div class="theme-toggle-btn">
            <ThemeToggleButton width="60%" />
        </div>
    </div>
</template>

<style scoped
       lang="scss">
.navbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: calc(5vh + 2px + var(--button-height));
    
    .logo {
        width: 15%;
        height: 100%;
        
        img {
            height: 80%;
        }
    }
    
    .menu {
        width: 70%;
        height: 100%;
        border: 1px solid black;
    }
    
    .theme-toggle-btn {
        display: flex;
        justify-content: center;
        align-items: end;
        width: 15%;
        height: 100%;
    }
}
</style>
