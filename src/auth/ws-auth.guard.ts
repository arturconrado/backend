import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { SocketWithUser } from '../chat/socket-with-user.type';

@Injectable()
export class WsAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client: SocketWithUser = context.switchToWs().getClient();
        const token = client.handshake.auth.token;

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = this.jwtService.verify(token);
            const user = await this.authService.validateJwtPayload(payload);
            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }
            client.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}