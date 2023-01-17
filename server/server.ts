import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import './config';
import { sendRequest } from './redirect';

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api', (request: Request, response: Response) => {
    request.accepts('text/plain');
    response.type('application/json');

    sendRequest(request.query['prompt'] as string).then(
        res => {
            console.log(res.data);
            response.send(res.data);
        }
    );
});

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});
