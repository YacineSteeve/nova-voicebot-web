import type { MutationTree } from 'vuex';
import type { State } from '@/store/state';

export enum MutationTypes {
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
}

export type Mutations<S = State> = {
    [MutationTypes.CHANGE_LANGUAGE](state: S, newLanguage: string): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.CHANGE_LANGUAGE](state, newLanguage: string) {
        state.language = newLanguage;
    }
};
