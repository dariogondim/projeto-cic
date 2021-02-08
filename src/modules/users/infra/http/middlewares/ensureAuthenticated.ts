import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/messages/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    _response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as ITokenPayload;

        const [user_id, vendor_id] = sub.split('($)');

        request.user = { user_id, vendor_id };

        next();
    } catch {
        throw new AppError('Invalid JWT Token', 401);
    }
}
