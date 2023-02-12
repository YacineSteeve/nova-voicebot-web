import {Configuration, OpenAIApi} from 'openai';
import axios from 'axios';
import type {AxiosResponse} from 'axios';
import * as process from 'process';

const openaiConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(openaiConfiguration);

export async function getCompletion(prompt: string): Promise<AxiosResponse> {
    return await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 150,
        frequency_penalty: 0.0,
        presence_penalty: 0.6
    });
}

export async function getSpeech(text: string, lang: string): Promise<AxiosResponse> {
    return await axios.request({
        url: 'https://text-to-speech53.p.rapidapi.com/',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'text-to-speech53.p.rapidapi.com'
        },
        data: JSON.stringify({
            text: text,
            lang: lang,
            format: 'mp3'
        })
    });
}

export async function getModeration(input: string): Promise<AxiosResponse> {
    return openai.createModeration({
        input: input
    });
}
