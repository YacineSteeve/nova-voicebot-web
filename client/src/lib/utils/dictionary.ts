import dictionary from '@/lib/utils/dictionary.json';

export interface DictionaryEntry {
    callToTalk: string;
    novaGreeting: string;
}

export interface Dictionary {
    [code: string]: DictionaryEntry;
}

export const getAllDictionary = (): Dictionary => dictionary;

export const getDictionaryEntry = (language: string): DictionaryEntry => {
    return dictionary[language];
};
