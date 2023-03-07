import type { Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import { User } from '../../database';

export function createUser(request: Request, response: Response) {
    if (!request.body.email || !request.body.password) {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing credentials parameter to signup.'
            });
        return
    }

    User.create({
        username: request.body.username
            ? request.body.username
            : request.body.email.substring(0, request.body.email.lastIndexOf('@')),
        email: request.body.email,
        password: Bcrypt.hashSync(request.body.password, 10),
    }).then(user => {
        response
            .status(201)
            .json({
                success: true,
                user
            });
    }).catch(error => {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: ' + error
            });
    })
}
