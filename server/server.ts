import express from 'express';
import type {Express, Request, Response} from 'express';
import cors from 'cors';
import './src/config';
import {getModeration, getCompletion, getSpeech} from './src/redirect';
import highScoreCategories from './lib/high-score-categories';

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8000;
const moderationThreshold: number = 0.001;

app.use(cors());
app.use(express.json());

app.get('/api/completion', (request: Request, response: Response) => {
    request.accepts('text/plain');
    response.type('application/json');

    const queryParams = {
        prompt: request.query['prompt'] as string,
    };

    if (!queryParams.prompt || queryParams.prompt === '') {
        return new Error('SERVER ERROR: Missing `prompt` parameter to completion request.');
    }

    getModeration(queryParams.prompt)
        .then(moderationResponse => {
            const highScores = highScoreCategories(
                moderationResponse.data.results[0].category_scores,
                moderationThreshold
            )

            if (moderationResponse.data.results[0].flagged
                || highScores.found
            ) {
                response
                    .status(400)
                    .send(highScores.categories)
            } else {
                getCompletion(queryParams.prompt)
                    .then(completionResponse => {
                        response.send(completionResponse.data);
                    })
                    .catch(error => {
                        response
                            .status(error.response.status)
                            .send('Completion went wrong');
                    });
            }
        })
        .catch(error => {
            response
                .status(error.response.status)
                .send('Moderation went wrong');
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
        return new Error('SERVER ERROR: Missing `text` parameter to speech request.');
    }

    if (!queryParams.lang || queryParams.lang === '') {
        return new Error('SERVER ERROR: Missing `lang` parameter to speech request.');
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
