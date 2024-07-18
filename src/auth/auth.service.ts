import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(user: any) {
        const payload = { id: user.id };
        const token = this.jwtService.sign(payload);
        console.log('Token gerado:', token);
        return {
            access_token: token,
        };
    }

    async validateToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}
