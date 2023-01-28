import type { LanguageCode, Theme, NovaStatus } from '@/lib/types';

export const state = {
    language: navigator.language,
    userTheme: 'light',
    novaStatus: 'sleeping',
    fetchStatus: false,
    userText: '',
    responseText: ''
};

export type State = {
    language: LanguageCode,
    userTheme: Theme,
    novaStatus: NovaStatus,
    fetchStatus: boolean,
    userText: string,
    responseText: string
}
