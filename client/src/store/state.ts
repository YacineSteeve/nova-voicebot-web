import type { LanguageCode, Theme, NovaStatus } from '@/lib/types';

export const state = {
    language: navigator.language as LanguageCode,
    userTheme: 'light' as Theme,
    novaStatus: 'sleeping' as NovaStatus,
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
