import { GetterTree } from 'vuex';
import { State } from '@/store/state';
import type { ShortLanguageCode } from '@/lib/types';
import { getDictionaryEntry } from '@/lib/utils/dictionary';
import type { DictionaryEntry } from '@/lib/utils/dictionary';

export type Getters = {
    truncatedLanguageCode(state: State): ShortLanguageCode;
    translationsDictionary(state: State, getters: Getters): DictionaryEntry;
}

export const getters: GetterTree<State, State> & Getters = {
    truncatedLanguageCode: (state) => {
        return state.language.slice(0, 2);
    },
    translationsDictionary: (state, getters) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return getDictionaryEntry(getters.truncatedLanguageCode);
    }
};
