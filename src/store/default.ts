import type { LanguageCode, NovaStatus, Theme } from '@/lib/types';

const defaultState = {
    language: navigator.language as LanguageCode,
    userTheme: 'light' as Theme,
    novaStatus: 'sleeping' as NovaStatus,
    fetchStatus: false,
    warningTriggered: false,
    userText: '',
    responseText: ''
};

export default defaultState;
