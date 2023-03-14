<script setup
        lang="ts">
import POLICIES, {POLICIES_NAMES} from '@/lib/policies';

interface LegalStuffProps {
    policyName: POLICIES_NAMES;
}

const props = defineProps<LegalStuffProps>();

const policy = POLICIES[props.policyName];
</script>

<template>
    <section class="total-center">
        {{ policy.fileContent }}
    </section>
</template>

<style scoped
       lang="scss">
section {
    flex-direction: column;
    width: 65vw;
    height: 80vh;
    background: var(--background-primary);
    color: var(--text-primary);
}
</style>
