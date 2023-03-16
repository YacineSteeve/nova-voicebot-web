<script setup lang="ts">
interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const props = defineProps<ProgressBarProps>();
</script>

<template>
    <div class="progressbar-container total-center">
        <div
            v-for="index in props.totalSteps"
            :key="index"
            class="step total-center"
            :class="{ passed: props.currentStep >= index }"
        >
            <div v-if="index > 1" class="separator"></div>
            <div class="indicator total-center">
                {{ index }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.progressbar-container {
    flex-direction: row;
    width: 50vw;
    margin-block: 1em;
    color: var(--text-secondary);
    font-size: 1.15em;
}

.indicator {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background: var(--palette-spun-pearl);
}

.separator {
    flex: 1;
    width: calc(
        (50vw - v-bind('props.totalSteps') * 2em) / 4
    );
    height: 2px;
    background: var(--palette-spun-pearl);
}

.step.passed .indicator,
.step.passed .separator {
    background: var(--palette-carribean-green);
}
</style>
