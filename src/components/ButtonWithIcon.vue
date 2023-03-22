<script setup
        lang="ts">
    interface ButtonWithIconProps {
        icon: string;
        iconScale?: string;
        width: string;
    }
    
    const props = defineProps<ButtonWithIconProps>();
</script>

<template>
    <div class="button">
        <div class="icon total-center">
            <v-icon :name="props.icon"
                    :scale="props.iconScale || '1'"></v-icon>
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
    min-height: var(--button-height);
    background: var(--palette-electric-violet);
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
        font-weight: bold;
        font-size: 1.25em;
        width: fit-content;
        height: fit-content;
    }
}

.button:hover {
    box-shadow: 0 0 2px 5px rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
}
</style>
