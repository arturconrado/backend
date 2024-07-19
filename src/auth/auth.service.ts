import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(user: any) {
        const payload: JwtPayload = { id: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
        };
    }

    async validateToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}