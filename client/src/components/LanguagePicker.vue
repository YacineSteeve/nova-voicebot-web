<script setup
        lang="ts">
    import { getLanguages } from '@/lib/utils/languages';
    import { useStore } from '@/store/store';
    import { MutationTypes } from '@/store/mutations';
    
    interface LanguagePickerProps {
        width: string;
    }
    
    interface LanguagePickerEmits {
        (e: 'languagePicked'): void;
    }
    
    const props = defineProps<LanguagePickerProps>();
    const emit = defineEmits<LanguagePickerEmits>();
    const store = useStore();
    const languages = getLanguages();
    
    function selectLanguage(index: number) {
        store.commit(MutationTypes.CHANGE_LANGUAGE, languages[index].code);
        emit('languagePicked');
    }
</script>

<template>
    <div class="language-picker scrolled">
        <div class="container">
            <div v-for="(language, index) in getLanguages()"
                 :key="language"
                 @click="selectLanguage(index)"
                 class="language"
                 :class="{current: language.code === store.state.language}">
                <p>
                    {{ language.name }}
                    <span v-if="language.country">
                        &nbsp;({{ language.country }})&nbsp;&nbsp;
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped
       lang="scss">

$height: 300px;

.language-picker {
    width: v-bind('props.width');
    height: $height;
    border-radius: 8px;
    
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        
        color: var(--text-primary);
        background: var(--background-primary);
        
        .language {
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 100%;
            min-height: calc($height / 6);
            padding-left: calc($height / 18);
            
            &:hover,
            &.current {
                background: var(--background-secondary);
            }
            
            &:active {
                background: var(--background-primary)
            }
            
            p {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
