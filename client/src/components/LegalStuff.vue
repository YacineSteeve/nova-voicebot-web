<script setup
        lang="ts">
import POLICIES, {POLICIES_NAMES, RAW_POLICIES_PATHS_MAP} from '@/lib/policies';
import MarkdownFormatted from '@/components/MarkdownFormatted.vue';

interface LegalStuffProps {
    policyName: POLICIES_NAMES;
}

const props = defineProps<LegalStuffProps>();

const policy = POLICIES[props.policyName];
</script>

<template>
    <section class="scrolled">
        <div class="download">
            <a :href="RAW_POLICIES_PATHS_MAP[props.policyName]"
               :title="`Download our ${policyName.split('-').join(' ')}`"
               download
            >
                {{ policyName }}
                <v-icon name="fa-download"/>
            </a>
        </div>
        <MarkdownFormatted :source="policy.fileContent"/>
    </section>
</template>

<style scoped
       lang="scss">
section {
    position: relative;
    font-size: 1.45em;
    width: max-content;
    height: 80vh;
    padding-block: 2em;
    padding-inline: 3em;
    background: var(--background-primary);
    color: var(--text-primary);

    .download {
        position: sticky;
        top: -2em;
        right: 0;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: fit-content;

        a {
            height: 1em;
            padding: 10px;
            color: var(--text-primary);
            background: var(--background-secondary);
        }
    }
}
</style>
