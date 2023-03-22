<script setup
        lang="ts">
import type { NovaStatus } from '@/lib/types';

interface NovaEyeProps {
    state: NovaStatus;
}

const props = defineProps<NovaEyeProps>();
</script>

<template>
    <div class="nova-eye">
        <v-icon v-if="props.state === 'active'"
                title="Hey !"
                animation="float">
            <v-icon name="md-panoramafisheye-twotone"
                    fill="#ffffff"
                    scale="5.5">
            </v-icon>
            <v-icon name="ri-eye-2-line"
                    fill="#000000"
                    scale="6"></v-icon>
        </v-icon>
        <v-icon v-else-if="props.state === 'sleeping'"
                title="zzZ"
                name="ri-eye-close-line"
                fill="#000000"
                scale="6"
                animation="float"></v-icon>
        <v-icon v-else-if="props.state === 'loading'"
                title="Euh..."
                name="ri-loader-5-fill"
                scale="6"
                animation="spin"></v-icon>
        <v-icon v-else-if="props.state === 'warning'"
                title="I don't do this !"
                name="io-warning"
                fill="#EF3625"
                scale="6"
                animation="ring"
                speed="slow"></v-icon>
    </div>
</template>

<style scoped
       lang="scss">
.nova-eye {
    position: relative;
    height: fit-content;
}
</style>
