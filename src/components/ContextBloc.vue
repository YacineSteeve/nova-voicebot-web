<script setup
        lang="ts">
</script>

<template>
    <div class="context-bloc">
        <slot></slot>
    </div>
</template>

<style scoped
       lang="scss">
.context-bloc {
    flex: 1;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>
