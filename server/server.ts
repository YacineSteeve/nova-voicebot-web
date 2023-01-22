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
    response.type('audio/mpeg');

    getSpeech(request.query['text'] as string)
        .then(res => {
            console.log(res.data);
            response.send(res.data);
        });
});

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});
