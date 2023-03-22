import dictionary from '@/utils/dictionary.json';
import type { ShortLanguageCode } from '@/lib/types';

export interface DictionaryEntry {
    callToTalk: string;
    novaGreeting: string;
}

export interface Dictionary {
    [code: ShortLanguageCode]: DictionaryEntry;
}

export const getAllDictionary = (): Dictionary => dictionary;

export const getDictionaryEntry = (language: ShortLanguageCode): DictionaryEntry => {
    return dictionary[language];
};
