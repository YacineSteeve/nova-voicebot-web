<script setup
        lang="ts">
</script>

<template>
    <div class="nova-mouth">
        <div class="lip left"></div>
        <div v-for="i of 20"
             class="tooth"
             :key="i"></div>
        <div class="lip right"></div>
    </div>
</template>

<style scoped
       lang="scss">
.nova-mouth {
    display: flex;
    align-items: end;
    flex-wrap: nowrap;
    gap: 3px;
    width: 250px;
    height: fit-content;
    
    .tooth,
    .lip {
        flex: 1;
        height: .5em;
        border-radius: 2px;
        background: white;
    }
    
    .lip {
        &.left {
            height: 1.75em;
            transform: rotate(-40deg) translateX(-.5em);
        }
        
        &.right {
            height: 1.75em;
            transform: rotate(40deg) translateX(.5em);
        }
    }
}
</style>
