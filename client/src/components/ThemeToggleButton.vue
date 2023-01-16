<script setup
        lang="ts">
    import { computed, inject, ref } from 'vue';
    import type { Ref } from 'vue';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    
    interface ThemeToggleButtonProps {
        width: string;
    }
    
    type Theme = 'dark' | 'light';
    const preferredTheme: Theme = inject('preferredTheme') || 'light';
    const userTheme: Ref<Theme> = ref(preferredTheme);
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
                        @click="toggleTheme"
                        title="Light Mode">
            Light Mode
        </ButtonWithIcon>
        <ButtonWithIcon v-else
                        icon="fa-moon"
                        width="100%"
                        @click="toggleTheme"
                        title="Dark Mode">
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
