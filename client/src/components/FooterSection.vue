<script setup
        lang="ts">
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    
    function goToNova() {
        router.push('/');
    }
</script>

<template>
    <footer>
        <div class="footer-container total-center">
            <h1>Hello</h1>
            <button @click="goToNova">Go back</button>
        </div>
        <div class="footer-footer total-center">
            @copyright
        </div>
    </footer>
</template>

<style scoped
       lang="scss">

$f-height: calc(100vh - var(--main-scroll-overflow-height));
$ff-height: 75px;

footer {
    position: sticky;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: $f-height;
    background: var(--palette-black);
    
    .footer-container {
        position: absolute;
        bottom: $ff-height;
        height: calc($f-height - $ff-height);
        width: 100%;
    }
    
    .footer-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: $ff-height;
        background-color: var(--palette-darker-black);
    }
}
</style>
