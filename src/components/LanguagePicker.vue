<script setup
        lang="ts">
import {computed, ref} from 'vue';
import type {Ref} from 'vue';
import {getLanguages} from '@/utils/languages';
import {useStore} from '@/store/store';
import {MutationTypes} from '@/store/mutations';

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
const searchedString: Ref<string> = ref('');
const filteredLanguages = computed(() => {
    return languages.filter((language) =>
        language.name.toLowerCase().includes(searchedString.value.toLowerCase())
        || language.country?.toLowerCase().includes(searchedString.value.toLowerCase())
        || language.code.toLowerCase().includes(searchedString.value.toLowerCase())
    )
})

function selectLanguage(index: number) {
    store.commit(MutationTypes.CHANGE_LANGUAGE, filteredLanguages.value[index].code);
    emit('languagePicked');
}
</script>

<template>
    <div class="language-picker">
        <input type="search" v-model="searchedString">
        <div class="container scrolled">
            <ul>
                <li
                    v-for="(language, index) in filteredLanguages"
                    :key="language"
                    @click="selectLanguage(index)"
                    class="language"
                    :class="{current: language.code === store.state.language}">
                    {{ language.name }}
                    <span v-if="language.country">
                        &nbsp;({{ language.country }})&nbsp;&nbsp;
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped
       lang="scss">

$height: 300px;

.language-picker {
    width: v-bind('props.width');
    height: fit-content;
    border-radius: 8px;

    input {
        width: 100%;
        height: 30px;

        &:focus {
            outline: solid black 2px;
        }
    }

    .container {
        width: 100%;
        height: $height;
        color: var(--text-primary);

        ul {
            display: flex;
            flex-direction: column;
            background: var(--background-primary);

            .language {
                cursor: pointer;
                display: flex;
                align-items: center;
                width: 100%;
                min-height: calc($height / 10);
                padding-left: calc($height / 18);

                &:hover {
                    background: var(--background-secondary);
                }

                &:active {
                    background: var(--background-primary)
                }

                &.current {
                    background: var(--palette-heliotrope);
                }

                p {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
