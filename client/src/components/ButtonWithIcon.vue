<script setup
        lang="ts">
    interface ButtonWithIconProps {
        icon: string;
        width: string;
    }
    
    const props = defineProps<ButtonWithIconProps>();
</script>

<template>
    <div class="button">
        <div class="icon total-center">
            <v-icon :name="props.icon"></v-icon>
        </div>
        <p>
            <slot></slot>
        </p>
    </div>
</template>

<style scoped
       lang="scss">
.button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: fit-content;
    min-width: v-bind('props.width');
    height: var(--button-height);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    
    .icon {
        width: fit-content;
        height: 100%;
        
        > * {
            width: 100%;
        }
    }
    
    p {
        width: fit-content;
        height: fit-content;
        text-align: center;
    }
}

.button:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
}
</style>
