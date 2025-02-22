import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password ?? '')) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.validateJwtPayload(payload);
            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }


    async validateJwtPayload(payload: any) {
        const user = await this.usersService.findById(payload.sub);
        if (user && user.role === payload.role) {
            return user;
        }
        return null;
    }
}