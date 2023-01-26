import languages from '@/lib/utils/languages.json';

export interface Language {
    name: string;
    code: string;
    country: string | null;
}

export const getLanguages = (): Language[] => languages;
