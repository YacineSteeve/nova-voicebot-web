import { GetterTree } from 'vuex';
import { State } from '@/store/state';

export type Getters = {
    truncatedLanguageCode(state: State): string;
}

export const getters: GetterTree<State, State> & Getters = {
    truncatedLanguageCode: (state) => {
        return state.language.slice(0, 2);
    }
};
