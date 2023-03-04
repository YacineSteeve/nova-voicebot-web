import type { Request, Response } from 'express';
import { redirectSpeech } from '../redirect';

export function getSpeech(request: Request, response: Response) {
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

    redirectSpeech(
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
}
