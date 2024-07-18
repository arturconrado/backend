import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {auth} from "../firebaseAdminConfig";

interface AuthenticatedRequest extends Request {
    user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const decodedToken = await auth.verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
