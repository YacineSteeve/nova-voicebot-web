import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import './config';
import { getCompletion, getSpeech } from './redirect';

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/completion', (request: Request, response: Response) => {
    request.accepts('text/plain');
    response.type('application/json');

    getCompletion(request.query['prompt'] as string)
        .then(res => {
            console.log(res.data);
            response.send(res.data);
        });
});

app.get('/api/speech', (request: Request, response: Response) => {
    request.accepts('text/plain');
    response.type('application/json');

    const queryParams = {
        text: request.query['text'] as string,
        lang: request.query['lang'] as string
    };

    if (!queryParams.text || queryParams.text === '') {
        throw new Error('CLIENT ERROR: Missing `text` parameter to speech request.');
    }

    if (!queryParams.lang || queryParams.lang === '') {
        throw new Error('CLIENT ERROR: Missing `lang` parameter to speech request.');
    }

    getSpeech(
        queryParams.text,
        queryParams.lang
    )
        .then(res => {
            response.send(res.data);
        })
        .catch(error => {
            response
                .status(error.response.status)
                .send(`${error.response.statusText.toUpperCase()}: ` +
                    `Invalid language '${JSON.parse(error.response.config.data).lang}'`
                );
        });
});

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});
