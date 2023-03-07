import type { Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { User } from '../../database';

export function getUser(request: Request, response: Response) {
    if (!request.body.email || !request.body.password) {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing credentials parameter to login.',
                fields: ['email', 'password']
            });
        return
    }

    User.findOne({email: request.body.email})
        .then(user => {
            if (!user) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: User not found',
                        fields: ['email']
                    });
                return
            }

            if (!Bcrypt.compareSync(request.body.password, user.password)) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: Wrong password',
                        fields: ['password']
                    });
                return
            }

            const token = JWT.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET
            );

            response
                .header('auth-token', token)
                .json({
                    success: true,
                    token
                });
        })
        .catch(error => {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'SERVER ERROR: ' + error
                });
        });
}

export function getUserByToken(request: Request, response: Response) {
    if (!request.headers || !request.headers['auth-token'] || request.headers['auth-token'] === '') {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing auth-token header'
            });
        return
    }

    const token = request.headers['auth-token'] as string;
    let decoded: any = null;

    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: ' + error
            });
        return
    }

    User.findOne({email: decoded.email}).then(user => {
        if (!user) {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'SERVER ERROR: User not found',
                });
            return
        }

        response
            .json({
                success: true,
                user: {
                    username: user.username,
                    email: user.email,
                }
            });
    })
}
