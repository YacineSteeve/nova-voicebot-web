<script setup
        lang="ts">
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
</script>

<template>
    <div class="nova-view">
        <div class="button-section left">
            <ButtonWithIcon icon="fa-solid fa-chevron-left"
                            width="40%">
                Exit
            </ButtonWithIcon>
        </div>
        <div class="glass-card">
        
        </div>
        <div class="button-section right">
            <ButtonWithIcon icon="fa-solid fa-moon"
                            width="60%">
                Dark Mode
            </ButtonWithIcon>
            <ButtonWithIcon icon="fa-solid fa-sliders"
                            width="60%">
                Settings
            </ButtonWithIcon>
        </div>
    </div>
</template>

<style scoped
       lang="scss">

$view-height: calc(100vh - 10vh);

.nova-view {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    
    .button-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 5vh;
        align-items: center;
        width: 15%;
        height: $view-height;
    }
    
    .glass-card {
        width: 70%;
        height: $view-height;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
}
</style>
