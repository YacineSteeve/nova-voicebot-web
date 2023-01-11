import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import './config';
import { sendRequest } from './redirect';

const app: Express = express();
const port: string | number = process.env.SERVER_PORT || 8000;

// To be removed
const s: string = 'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\\n\\nHuman: Hello, who are you?\\nAI: I am an AI created by OpenAI. How can I help you today?\\nHuman: I\'d like to cancel my subscription.\\nAI:';

app.use(cors());
app.get('/api', (request: Request, response: Response) => {
    response.set('Content-Type', 'application/json');
    sendRequest(s).then(
        res => {
            console.log(res.data);
            response.send({
                request: res.request,
                headers: res.headers,
                config: res.config,
                status: res.status,
                statusText: res.statusText,
                data: res.data
            });
        }
    );
});

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});
