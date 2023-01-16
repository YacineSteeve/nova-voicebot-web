<script setup
        lang="ts">
</script>

<template>
    <footer>
        <div class="footer-container total-center">
            <h1>Hello</h1>
        </div>
        <div class="footer-footer total-center">
            &copy; Copyright - Yacine BOUKARI - Nova Voice Bot
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
    color: var(--text-primary);
    background: var(--background-primary);
    
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
        background: var(--background-secondary);
    }
}
</style>
