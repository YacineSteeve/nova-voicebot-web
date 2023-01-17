import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);

export async function sendRequest(prompt: string) {
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
