<script setup
        lang="ts">
    import { computed } from 'vue';
    import { useStore } from '@/store/store';
    import { MutationTypes } from '@/store/mutations';
    import ButtonWithIcon from '@/components/ButtonWithIcon.vue';
    
    interface ThemeToggleButtonProps {
        width: string;
    }
    
    const props = defineProps<ThemeToggleButtonProps>();
    const store = useStore();
    
    const userTheme = computed(() => store.state.userTheme);
    const isDarkTheme = computed(() => userTheme.value === 'dark');
    
    function toggleTheme() {
        store.commit(MutationTypes.CHANGE_USER_THEME,
            userTheme.value === 'dark'
                ? 'light'
                : 'dark'
        );
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
