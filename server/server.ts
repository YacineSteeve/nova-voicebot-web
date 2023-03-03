import express from 'express';
import type {Express, Request, Response} from 'express';
import cors from 'cors';
import * as JWT from 'jsonwebtoken';
import * as Bcrypt from 'bcryptjs';
import './src/config';
import { getModeration, getCompletion, getSpeech } from './src/redirect';
import { User } from './src/database';
import highScoreCategories from './lib/high-score-categories';

const PORT: string | number = process.env.SERVER_PORT || 8000;
const MODERATION_THRESHOLD: number = 0.001;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.post('/user/signup', (request: Request, response: Response) => {
    if (!request.body.email || !request.body.password) {
        response
            .status(500)
            .json({
                error: true,
                message: 'SERVER ERROR: Missing credentials parameter to signup.'
            });
        return
    }

    User.create({
        email: request.body.email,
        password: Bcrypt.hashSync(request.body.password, 10),
    }).then(user => {
        const token = JWT.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
        );

        response
            .status(201)
            .json({success: true, token});
    }).catch(error => {
        response
            .status(500)
            .json({success: false, error});
    })
});

app.post('/user/login', (request: Request, response: Response) => {
    if (!request.body.email || !request.body.password) {
        response
            .status(500)
            .json({
                error: true,
                message: 'SERVER ERROR: Missing credentials parameter to signup.'
            });
        return
    }

    User.findOne({email: request.body.email})
        .then(user => {
            if (!user) {
                response
                    .status(500)
                    .json({success: false, error: 'User not found'});
                return
            }

            if (!Bcrypt.compareSync(request.body.password, user.password)) {
                response
                    .status(500)
                    .json({success: false, error: 'Wrong password'});
                return
            }

            const token = JWT.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            );

            response.json({success: true, token});
        })
        .catch(error => {
            response
                .status(500)
                .json({success: false, error});
        });
});

app.get('/api/completion', (request: Request, response: Response) => {
    request.accepts('text/plain');
    response.type('application/json');

    const queryParams = {
        prompt: request.query['prompt'] as string,
    };

    if (!queryParams.prompt || queryParams.prompt === '') {
        response
            .status(500)
            .json({
                error: true,
                message: 'SERVER ERROR: Missing `prompt` parameter to completion request.'
            });
        return
    }

    getModeration(queryParams.prompt)
        .then(moderationResponse => {
            const highScores = highScoreCategories(
                moderationResponse.data.results[0].category_scores,
                MODERATION_THRESHOLD
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
        response
            .status(500)
            .json({
                error: true,
                message: 'SERVER ERROR: Missing `text` parameter to speech request.'
            });
        return
    }

    if (!queryParams.lang || queryParams.lang === '') {
        response
            .status(500)
            .json({
                error: true,
                message: 'SERVER ERROR: Missing `lang` parameter to speech request.'
            });
        return
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

app.listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`);
});
