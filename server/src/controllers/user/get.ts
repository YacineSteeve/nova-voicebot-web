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
                error: 'SERVER ERROR: Missing credentials parameter to login.'
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
                        error: 'SERVER ERROR: User not found'
                    });
                return
            }

            if (!Bcrypt.compareSync(request.body.password, user.password)) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: Wrong password'
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
                    token,
                    user
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
