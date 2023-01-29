import type { MutationTree } from 'vuex';
import type { State } from '@/store/state';
import type { LanguageCode, Theme, NovaStatus } from '@/lib/types';
import cookies from '@/lib/cookies';

export enum MutationTypes {
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
    CHANGE_USER_THEME = 'CHANGE_USER_THEME',
    CHANGE_NOVA_STATUS = 'CHANGE_NOVA_STATUS',
    UPDATE_FETCH_STATUS = 'UPDATE_FETCH_STATUS',
    CHANGE_USER_TEXT = 'CHANGE_USER_TEXT',
    CHANGE_RESPONSE_TEXT = 'CHANGE_RESPONSE_TEXT'
}

export type Mutations<S = State> = {
    [MutationTypes.CHANGE_LANGUAGE](state: S, newLanguage: LanguageCode): void;
    [MutationTypes.CHANGE_USER_THEME](state: S, newUserTheme: Theme): void;
    [MutationTypes.CHANGE_NOVA_STATUS](state: S, newNovaStatus: NovaStatus): void;
    [MutationTypes.UPDATE_FETCH_STATUS](state: S, newFetchStatus: boolean): void;
    [MutationTypes.CHANGE_USER_TEXT](state: S, newUserText: string): void;
    [MutationTypes.CHANGE_RESPONSE_TEXT](state: S, newResponseText: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.CHANGE_LANGUAGE](state, newLanguage: LanguageCode) {
        state.language = newLanguage;
        cookies.set('nova-language', newLanguage);
    },
    [MutationTypes.CHANGE_USER_THEME](state, newUserTheme: Theme) {
        state.userTheme = newUserTheme;
        cookies.set('nova-theme', newUserTheme);
    },
    [MutationTypes.CHANGE_NOVA_STATUS](state, newNovaStatus: NovaStatus) {
        state.novaStatus = newNovaStatus;
    },
    [MutationTypes.UPDATE_FETCH_STATUS](state, newFetchStatus: boolean) {
        state.novaStatus = state.novaStatus !== 'sleeping'
            ? newFetchStatus
                ? 'loading'
                : 'active'
            : 'sleeping';
        state.fetchStatus = newFetchStatus;
    },
    [MutationTypes.CHANGE_USER_TEXT](state, newUserText: string) {
        state.userText = newUserText;
    },
    [MutationTypes.CHANGE_RESPONSE_TEXT](state, newResponseText: string) {
        state.responseText = newResponseText;
    }
};
