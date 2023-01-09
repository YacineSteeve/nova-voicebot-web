<script setup
        lang="ts">
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    
    function goToNova() {
        router.push('/nova');
    }
</script>

<template>
    <div class="home">
        <button @click="goToNova">Get Started</button>
    </div>
</template>

<style scoped
       lang="scss">
</style>
