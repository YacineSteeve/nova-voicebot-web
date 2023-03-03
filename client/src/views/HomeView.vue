<script setup
        lang="ts">
    import { useRouter } from 'vue-router';
    import NavBar from '@/components/NavBar.vue';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    
    const router = useRouter();
    
    function goToNova() {
        router.push('/nova');
    }
</script>

<template>
    <div class="home">
        <NavBar />
        <section>
            <ButtonWithIcon icon="io-play-circle"
                            icon-scale="1.5"
                            width="10em"
                            title="Get Started"
                            class="btn"
                            @click="goToNova">
                <b>Get Started</b>
            </ButtonWithIcon>
        </section>
    </div>
</template>

<style scoped
       lang="scss">
$section-margin: calc(0.4 * var(--navbar-height));
$section-button-padding: calc(100vh - 3 * var(--navbar-height));

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
        height: 200vh;
        background: var(--palette-blue-gem);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        
        .btn {
            position: absolute;
            top: $section-button-padding;
            font-size: 1.2em;
        }
    }
}
</style>
