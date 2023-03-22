<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
import type {Options} from 'vue-markdown-render';

interface MarkdownFormattedProps {
    source: string;
}

const props = defineProps<MarkdownFormattedProps>();

const renderOptions: Options = {
    html: true,
    typographer: true,
    breaks: true,
};
</script>

<template>
    <vue-markdown :source="props.source" :options="renderOptions"></vue-markdown>
</template>

<style scoped lang="scss">
</style>
