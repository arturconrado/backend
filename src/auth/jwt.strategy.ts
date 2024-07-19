// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import {JwtPayload} from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}