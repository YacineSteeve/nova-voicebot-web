import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import './src/config';
import { connection } from './src/database';
import { createUser, getUser } from './src/controllers/user';
import { getCompletion, getSpeech } from './src/api';

const PORT: string | number = process.env.SERVER_PORT || 8000;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post('/user/signup', createUser);

app.post('/user/login', getUser);

app.get('/api/completion', getCompletion);

app.get('/api/speech', getSpeech);

app.listen(PORT, async () => {
    const db = await connection;
    console.log(
        `\n> Connected to database ${db.connection.name.toUpperCase()}` +
        `\n> Server listening on port ${PORT}\n`
    );
});
