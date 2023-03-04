import type { Request, Response } from 'express';
import { redirectCompletion, redirectModeration } from '../redirect';
import highScoreCategories from '../../lib/high-score-categories';

export function getCompletion(request: Request, response: Response) {
    request.accepts('text/plain');
    response.type('application/json');

    const MODERATION_THRESHOLD: number = 0.001;
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

    redirectModeration(queryParams.prompt)
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
                redirectCompletion(queryParams.prompt)
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
}
