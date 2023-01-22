import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import * as process from 'process';

const openaiConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(openaiConfiguration);

const voiceRssConfiguration = {
    baseURL: 'https://voicerss-text-to-speech.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
    }
};

export async function getCompletion(prompt: string) {
    return await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6
    });
}

export async function getSpeech(text: string): Promise<AxiosResponse> {
    return await axios.create(voiceRssConfiguration).request({
        params: {
            key: process.env.VOICERSS_API_KEY,
            src: text,
            hl: 'fr-fr',
            c: 'mp3'
        }
    });
}
