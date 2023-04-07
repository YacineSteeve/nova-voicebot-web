<script setup
        lang="ts">
import {useToast, POSITION} from 'vue-toastification';
import {POLICIES_NAMES} from '@/lib/policies';
import LegalStuff from '@/components/LegalStuff.vue';

interface LegalStuffToastedProps {
    policyName: POLICIES_NAMES;
}

const props = defineProps<LegalStuffToastedProps>();
const toast = useToast();

function showPolicy() {
    const toastContent = {
        component: LegalStuff,
        props: {
            policyName: props.policyName,
        },
    }

    toast(toastContent, {
        closeOnClick: false,
        position: POSITION.TOP_LEFT,
        timeout: false,
        hideProgressBar: true,
    });
}
</script>

<template>
    <span class="legal-stuff-toasted" @click="showPolicy">
        <slot></slot>
    </span>
</template>

<style scoped
       lang="scss">
.legal-stuff-toasted {
    margin-block: 1em;
    cursor: pointer;
    width: fit-content;

    &:hover {
        text-decoration: underline;
        text-underline-offset: 0.25em;
    }
}
</style>
