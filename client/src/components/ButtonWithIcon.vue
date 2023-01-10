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
        <font-awesome-icon :icon="props.icon"></font-awesome-icon>
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
    justify-content: flex-start;
    width: v-bind('props.width');
    min-width: fit-content;
    height: 40px;
    padding-left: 8%;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    
    p {
        flex: 1;
        min-width: fit-content;
        height: fit-content;
        margin-left: 10%;
    }
}

.button:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
}
</style>
