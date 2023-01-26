import type { MutationTree } from 'vuex';
import type { State } from '@/store/state';

export enum MutationTypes {
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
    CHANGE_NOVA_STATE = 'CHANGE_NOVA_STATE',
}

export type Mutations<S = State> = {
    [MutationTypes.CHANGE_LANGUAGE](state: S, newLanguage: string): void;
    [MutationTypes.CHANGE_NOVA_STATE](state: S, newNovaState: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.CHANGE_LANGUAGE](state, newLanguage: string) {
        state.language = newLanguage;
    },
    [MutationTypes.CHANGE_NOVA_STATE](state, newNovaState: string) {
        state.novaState = newNovaState;
    }
};
