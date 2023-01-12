<script setup
        lang="ts">
    import { useRouter } from 'vue-router';
    import NavBar from '@/components/NavBar.vue';
    
    const router = useRouter();
    
    function goToNova() {
        router.push('/nova');
    }
</script>

<template>
    <div class="home">
        <NavBar />
        <section>
            <button @click="goToNova">Get Started</button>
        </section>
        <section></section>
    </div>
</template>

<style scoped
       lang="scss">
.home {
    width: 100%;
    min-height: 100vh;
}
</style>
