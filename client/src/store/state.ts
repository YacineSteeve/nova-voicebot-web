import type {LanguageCode, NovaStatus, Theme} from '@/lib/types';
import defaultState from '@/store/default';

export const state = defaultState;

export type State = {
    language: LanguageCode,
    userTheme: Theme,
    novaStatus: NovaStatus,
    fetchStatus: boolean,
    warningTriggered: boolean,
    userText: string,
    responseText: string
}
