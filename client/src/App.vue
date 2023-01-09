<script setup
        lang="ts">
    import FooterSection from '@/components/FooterSection.vue';</script>

<template>
    <main class="total-center">
        <router-view></router-view>
    </main>
    <div class="main-scroll-overflow">
    </div>
    <FooterSection />
</template>

<style scoped
       lang="scss">
@mixin animate($animation,$duration,$method,$times) {
    animation: $animation $duration $method $times;
}

@mixin keyframes($name) {
    @keyframes #{$name}{
        @content;
    }
}

main {
    position: relative;
    z-index: 1;
    width: 100vw;
    min-height: 100vh;
    height: auto;
    overflow: hidden;
    
    > * {
        z-index: 2;
    }
    
    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 150vw;
        height: 150vw;
        background: rgb(119, 17, 229);
        background: linear-gradient(38deg, rgba(119, 17, 229, 1) 0%, rgba(178, 137, 255, 1) 7%, rgba(144, 19, 254, 1) 39%, rgba(119, 17, 229, 1) 50%, rgba(70, 13, 178, 1) 77%);
        @include animate(rotation, 12s, linear, infinite);
    }
    
    @include keyframes(rotation) {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}


.main-scroll-overflow {
    position: sticky;
    top: 0;
    height: var(--main-scroll-overflow-height);
    box-shadow: 0 1px 15px 5px black;
    background-color: var(--palette-electric-violet);
}
</style>
