<script setup
        lang="ts">
    import type { Ref } from 'vue';
    
    interface NovaEyeProps {
        state: Ref<'active' | 'sleeping' | 'loading' | 'warning'>;
        userName: string;
    }
    
    const props = defineProps<NovaEyeProps>();
</script>

<template>
    <div class="nova-eye">
        <v-icon v-show="props.state === 'active'"
                :title="`Hey ${props.userName} !`"
                name="ri-eye-2-line"
                scale="6"
                animation="float"
                flip="vertical"></v-icon>
        <v-icon v-show="props.state === 'sleeping'"
                title="zzZ"
                name="ri-eye-close-line"
                scale="6"
                animation="float"></v-icon>
        <v-icon v-show="props.state === 'loading'"
                title="Euh..."
                name="ri-loader-5-fill"
                scale="6"
                animation="spin"></v-icon>
        <v-icon v-show="props.state === 'warning'"
                title="I don't do this !"
                name="io-warning"
                scale="6"
                animation="ring"
                speed="slow"
                fill="#EF3625"></v-icon>
    </div>
</template>

<style scoped
       lang="scss">
.nova-eye {
    position: relative;
    height: fit-content;
}
</style>
