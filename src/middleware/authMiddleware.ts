import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}