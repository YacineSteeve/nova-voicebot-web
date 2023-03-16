import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import './src/env-config';
import { connection } from './src/database';
import { createUser, getUser, getUserByToken, deleteUser } from './src/controllers/user';
import { getCompletion, getSpeech } from './src/api/endpoints';
import { authorizeApiRequest } from './src/api/middlewares';

const PORT: string | number = process.env.SERVER_PORT || 8000;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post('/user/signup', createUser);

app.post('/user/login', getUser);

app.post('/user/userinfo', getUserByToken);

app.post('/user/delete', deleteUser);

app.use('/api', authorizeApiRequest);

app.get('/api/completion', getCompletion);

app.get('/api/speech', getSpeech);

app.listen(PORT, async () => {
    const db = await connection;
    console.log(
        `\n> Connected to the ${db.connection.name.toUpperCase()} database.` +
        `\n> Server listening on port ${PORT}\n`
    );
});
