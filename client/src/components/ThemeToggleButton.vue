<script setup
        lang="ts">
    import { ref, computed } from 'vue';
    import type { Ref } from 'vue';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    
    interface ThemeToggleButtonProps {
        width: string;
    }
    
    const userTheme: Ref<'light' | 'dark'> = ref('light');
    const props = defineProps<ThemeToggleButtonProps>();
    const isDarkTheme = computed(() => userTheme.value === 'dark');
    
    function toggleTheme() {
        userTheme.value = userTheme.value === 'dark'
            ? 'light'
            : 'dark';
        document.documentElement.className = userTheme.value;
    }
</script>

<template>
    <div class="theme-toggle">
        <ButtonWithIcon v-if="isDarkTheme"
                        icon="pr-sun"
                        width="100%"
                        @click="toggleTheme">
            Light Mode
        </ButtonWithIcon>
        <ButtonWithIcon v-else
                        icon="fa-moon"
                        width="100%"
                        @click="toggleTheme">
            Dark Mode
        </ButtonWithIcon>
    </div>
</template>

<style scoped
       lang="scss">
.theme-toggle {
    width: v-bind('props.width');
}
</style>
