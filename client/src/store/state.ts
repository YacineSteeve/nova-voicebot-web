export const state = {
    language: navigator.language,
    novaStatus: 'sleeping',
    fetchStatus: false,
    userText: '',
    responseText: ''
};

export type State = typeof state
